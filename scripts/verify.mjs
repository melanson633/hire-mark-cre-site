import { spawn, spawnSync } from "node:child_process";
import net from "node:net";
import { setTimeout as delay } from "node:timers/promises";

const HOST = "127.0.0.1";
const npmCmd = process.platform === "win32" ? "npm.cmd" : "npm";

function runNpmScript(script, extraEnv = {}) {
  return new Promise((resolve, reject) => {
    const child =
      process.platform === "win32"
        ? spawn(`${npmCmd} run ${script}`, [], {
            stdio: "inherit",
            shell: true,
            env: { ...process.env, ...extraEnv },
          })
        : spawn(npmCmd, ["run", script], {
            stdio: "inherit",
            shell: false,
            env: { ...process.env, ...extraEnv },
          });
    child.on("exit", (code) => {
      if (code === 0) return resolve();
      reject(new Error(`npm run ${script} failed with exit code ${code}.`));
    });
    child.on("error", reject);
  });
}

function canUsePort(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.unref();
    server.on("error", () => resolve(false));
    server.listen(port, HOST, () => {
      server.close(() => resolve(true));
    });
  });
}

async function pickPort() {
  for (let port = 4173; port <= 4190; port += 1) {
    if (await canUsePort(port)) return port;
  }
  throw new Error("No available local port found in range 4173-4190.");
}

async function waitForServer(baseUrl) {
  for (let attempt = 1; attempt <= 60; attempt += 1) {
    try {
      const response = await fetch(baseUrl);
      if (response.ok) return;
    } catch {}
    await delay(250);
  }
  throw new Error(`Preview server did not become ready: ${baseUrl}`);
}

function killProcessTree(pid) {
  if (!pid) return;
  if (process.platform === "win32") {
    spawnSync("taskkill", ["/PID", String(pid), "/T", "/F"], { stdio: "ignore" });
    return;
  }
  try {
    process.kill(-pid, "SIGTERM");
  } catch {
    try {
      process.kill(pid, "SIGTERM");
    } catch {}
  }
}

async function run() {
  await runNpmScript("lint");
  await runNpmScript("build");
  await runNpmScript("validate:content");

  const port = await pickPort();
  const baseUrl = `http://${HOST}:${port}`;
  const preview =
    process.platform === "win32"
      ? spawn(
          `${npmCmd} run preview -- --host ${HOST} --port ${port} --strictPort`,
          [],
          {
            stdio: "inherit",
            shell: true,
            detached: false,
          },
        )
      : spawn(
          npmCmd,
          ["run", "preview", "--", "--host", HOST, "--port", String(port), "--strictPort"],
          {
            stdio: "inherit",
            shell: false,
            detached: true,
          },
        );

  try {
    await waitForServer(baseUrl);
    await runNpmScript("smoke", { SMOKE_BASE_URL: baseUrl });
  } finally {
    killProcessTree(preview.pid);
  }
}

await run();
