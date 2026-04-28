import { neon } from "@neondatabase/serverless";
import { Resend } from "resend";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const defaultFromEmail = "mark@markbuilds.ai";
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
      <p>Your markbuilds.ai launch pack is ready.</p>
      <p>
        Download it here:
        <a href="${launchPackUrl}">${launchPackUrl}</a>
      </p>
      <p>
        It includes the Cowork metaprompt skill pack and practical notes for using
        AI in operator workflows.
      </p>
      <p>- Mark</p>
    </div>
  `;
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
      subject: "Your markbuilds.ai launch pack",
      html: buildEmailHtml(launchPackUrl),
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
