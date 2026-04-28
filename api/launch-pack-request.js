import { neon } from "@neondatabase/serverless";
import { Resend } from "resend";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const defaultFromEmail = "Mark at markbuilds.ai <launch@send.markbuilds.ai>";
const launchPackPath = "/downloads/cowork-metaprompt.zip";

function sendJson(response, statusCode, payload) {
  response.status(statusCode).json(payload);
}

function getPublicSiteUrl() {
  return (process.env.PUBLIC_SITE_URL || "https://markbuilds.ai").replace(/\/+$/, "");
}

function getLaunchPackUrl() {
  return `${getPublicSiteUrl()}${launchPackPath}`;
}

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

function isConfigured() {
  return Boolean(process.env.DATABASE_URL && process.env.RESEND_API_KEY);
}

function buildEmailHtml(launchPackUrl) {
  return `
    <div style="font-family: Arial, sans-serif; color: #111111; line-height: 1.6;">
      <p>You're on the markbuilds.ai early-access list.</p>

      <p>
        I'm Mark Melanson. I'm building markbuilds.ai as an AI implementation
        partner for companies that want practical systems, not AI theater.
        Company AI Audit openings will be offered to early-access partners in
        the coming weeks.
      </p>

      <p>Your first early-access asset is ready:</p>

      <p>
        <a href="${launchPackUrl}">Download the Cowork Metaprompt Skill</a>
      </p>

      <p>
        I'm starting with meta-prompting because better prompts are the most
        reliable first step toward getting better work out of AI systems.
      </p>

      <p>This Claude Cowork Skill helps rewrite prompts with:</p>

      <ul>
        <li>project, file, and tool context when you point Cowork toward it</li>
        <li>clearer scope and deliverables</li>
        <li>better clarification gates before work begins</li>
        <li>TodoWrite + verification structure</li>
        <li>skill, MCP, and connector routing</li>
        <li>subagent delegation when the task needs more context</li>
      </ul>

      <p>
        To install it in Claude Cowork: open <strong>Customize</strong> &gt;
        <strong>Skills</strong> &gt; <strong>Create skill</strong> &gt;
        <strong>Upload a skill</strong>. Select the ZIP file, then toggle it on.
      </p>

      <p>
        More Cowork Skill files and implementation assets will follow for
        early-access members.
      </p>

      <p>Reply with any questions or feedback.</p>

      <p>- Mark</p>
    </div>
  `;
}

function buildEmailText(launchPackUrl) {
  return `You're on the markbuilds.ai early-access list.

I'm Mark Melanson. I'm building markbuilds.ai as an AI implementation partner for companies that want practical systems, not AI theater. Company AI Audit openings will be offered to early-access partners in the coming weeks.

Your first early-access asset is ready:
${launchPackUrl}

I'm starting with meta-prompting because better prompts are the most reliable first step toward getting better work out of AI systems.

This Claude Cowork Skill helps rewrite prompts with:
- project, file, and tool context when you point Cowork toward it
- clearer scope and deliverables
- better clarification gates before work begins
- TodoWrite + verification structure
- skill, MCP, and connector routing
- subagent delegation when the task needs more context

To install it in Claude Cowork: open Customize > Skills > Create skill > Upload a skill. Select the ZIP file, then toggle it on.

More Cowork Skill files and implementation assets will follow for early-access members.

Reply with any questions or feedback.

- Mark`;
}

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    sendJson(response, 405, { error: "Method not allowed." });
    return;
  }

  const email = normalizeEmail(request.body?.email);
  const source = String(request.body?.source || "teaser-launch-pack").trim().slice(0, 120);

  if (!emailPattern.test(email)) {
    sendJson(response, 400, { error: "Enter a valid email address." });
    return;
  }

  if (!isConfigured()) {
    sendJson(response, 503, {
      error: "Launch pack delivery is not configured yet.",
    });
    return;
  }

  const sql = neon(process.env.DATABASE_URL);
  const resend = new Resend(process.env.RESEND_API_KEY);
  const fromEmail = process.env.RESEND_FROM_EMAIL || defaultFromEmail;
  const replyToEmail = process.env.RESEND_REPLY_TO_EMAIL || fromEmail;
  const launchPackUrl = getLaunchPackUrl();

  try {
    await sql`
      insert into launch_pack_requests (
        email,
        normalized_email,
        source,
        email_send_status,
        requested_at,
        updated_at
      )
      values (
        ${email},
        ${email},
        ${source},
        'pending',
        now(),
        now()
      )
      on conflict (normalized_email)
      do update set
        email = excluded.email,
        source = excluded.source,
        email_send_status = 'pending',
        requested_at = now(),
        updated_at = now()
    `;

    const result = await resend.emails.send({
      from: fromEmail,
      to: email,
      replyTo: replyToEmail,
      subject: "Your first early-access Cowork Skill",
      html: buildEmailHtml(launchPackUrl),
      text: buildEmailText(launchPackUrl),
    });

    if (result.error) {
      await sql`
        update launch_pack_requests
        set
          email_send_status = 'failed',
          updated_at = now()
        where normalized_email = ${email}
      `;

      sendJson(response, 502, { error: "Launch pack email could not be sent." });
      return;
    }

    await sql`
      update launch_pack_requests
      set
        email_send_status = 'sent',
        resend_email_id = ${result.data?.id || null},
        updated_at = now()
      where normalized_email = ${email}
    `;

    sendJson(response, 200, { ok: true });
  } catch {
    sendJson(response, 500, { error: "Launch pack request could not be completed." });
  }
}
