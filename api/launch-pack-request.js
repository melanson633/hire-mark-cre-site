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
    <div style="margin:0; padding:0; background:#f5f2eb;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse; background:#f5f2eb;">
        <tr>
          <td align="center" style="padding:32px 16px;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px; border-collapse:collapse; background:#11110f; border-radius:10px; overflow:hidden;">
              <tr>
                <td style="padding:34px 34px 20px; font-family:Arial, Helvetica, sans-serif;">
                  <div style="font-size:12px; font-weight:700; letter-spacing:0.08em; text-transform:uppercase; color:#caa25d;">
                    markbuilds.ai early access
                  </div>
                  <h1 style="margin:18px 0 0; color:#fbf4e8; font-size:30px; line-height:1.12; font-weight:800;">
                    Your first Cowork Skill is ready.
                  </h1>
                  <p style="margin:16px 0 0; color:#dfd4c3; font-size:16px; line-height:1.6;">
                    You're on the early-access list. I'm Mark Melanson, and I'm
                    building markbuilds.ai as an AI implementation partner for
                    companies that want practical systems, not AI theater.
                  </p>
                  <p style="margin:14px 0 0; color:#dfd4c3; font-size:16px; line-height:1.6;">
                    Company AI Audit openings will be offered to early-access
                    partners in the coming weeks.
                  </p>
                </td>
              </tr>
              <tr>
                <td style="padding:0 34px 26px; font-family:Arial, Helvetica, sans-serif;">
                  <table role="presentation" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
                    <tr>
                      <td style="border-radius:6px; background:#caa25d;">
                        <a href="${launchPackUrl}" style="display:inline-block; padding:14px 18px; color:#1c160d; font-size:15px; font-weight:800; text-decoration:none;">
                          Download the Cowork Metaprompt Skill
                        </a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td style="padding:0 34px 28px; font-family:Arial, Helvetica, sans-serif;">
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse; background:#1b1a16; border:1px solid rgba(251,244,232,0.16); border-radius:8px;">
                    <tr>
                      <td style="padding:24px;">
                        <p style="margin:0; color:#fbf4e8; font-size:16px; line-height:1.6;">
                          I'm starting with meta-prompting because better prompts
                          are the most reliable first step toward getting better
                          work out of AI systems.
                        </p>
                        <p style="margin:18px 0 10px; color:#caa25d; font-size:12px; font-weight:700; letter-spacing:0.08em; text-transform:uppercase;">
                          This skill helps rewrite prompts with
                        </p>
                        <ul style="margin:0; padding-left:20px; color:#dfd4c3; font-size:15px; line-height:1.7;">
                          <li>project, file, and tool context when you point Cowork toward it</li>
                          <li>clearer scope and deliverables</li>
                          <li>better clarification gates before work begins</li>
                          <li>TodoWrite + verification structure</li>
                          <li>skill, MCP, and connector routing</li>
                          <li>subagent delegation when the task needs more context</li>
                        </ul>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td style="padding:0 34px 36px; font-family:Arial, Helvetica, sans-serif;">
                  <p style="margin:0; color:#dfd4c3; font-size:15px; line-height:1.7;">
                    <strong style="color:#fbf4e8;">Install in Claude Cowork:</strong>
                    open Customize &gt; Skills &gt; Create skill &gt; Upload a
                    skill. Select the ZIP file, then toggle it on.
                  </p>
                  <p style="margin:16px 0 0; color:#dfd4c3; font-size:15px; line-height:1.7;">
                    More Cowork Skill files and implementation assets will follow
                    for early-access members.
                  </p>
                  <p style="margin:16px 0 0; color:#dfd4c3; font-size:15px; line-height:1.7;">
                    Reply with any questions or feedback.
                  </p>
                  <p style="margin:24px 0 0; color:#9f9482; font-size:15px; line-height:1.6;">
                    - Mark
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
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
