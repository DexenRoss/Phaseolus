import nodemailer from "nodemailer";

export function getTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || "587");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    throw new Error("SMTP env vars missing (SMTP_HOST/SMTP_USER/SMTP_PASS).");
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

export function inviteEmailHtml(opts: { appUrl: string; inviteUrl: string; expiresHours: number }) {
  const { appUrl, inviteUrl, expiresHours } = opts;

  // HTML con estilos inline (compatible con la mayoría de clientes)
  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>Invitación de colaborador</title>
  </head>
  <body style="margin:0;padding:0;background:#f5f6fb;font-family:Arial,Helvetica,sans-serif;color:#111827;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5f6fb;padding:28px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e5e7eb;">
            <tr>
              <td style="padding:22px 22px 10px 22px;border-bottom:1px solid #eef2f7;">
                <div style="font-size:12px;letter-spacing:0.08em;font-weight:700;color:#111827;">
                  UNAM · Phaseolus
                </div>
              </td>
            </tr>

            <tr>
              <td style="padding:22px;">
                <h1 style="margin:0 0 10px 0;font-size:22px;line-height:1.25;color:#111827;">
                  Te invitaron como colaborador
                </h1>
                <p style="margin:0 0 14px 0;font-size:14px;line-height:1.6;color:#374151;">
                  Usa el siguiente botón para crear tu cuenta de colaborador. Este enlace expira en
                  <strong>${expiresHours} horas</strong>.
                </p>

                <div style="margin:18px 0 20px 0;">
                  <a href="${inviteUrl}"
                     style="display:inline-block;background:#2563eb;color:#ffffff;text-decoration:none;font-weight:700;
                            padding:12px 16px;border-radius:999px;font-size:14px;">
                    Crear cuenta de colaborador
                  </a>
                </div>

                <p style="margin:0 0 8px 0;font-size:12px;line-height:1.6;color:#6b7280;">
                  Si el botón no funciona, copia y pega este enlace:
                </p>
                <p style="margin:0 0 18px 0;font-size:12px;line-height:1.6;color:#111827;word-break:break-all;">
                  ${inviteUrl}
                </p>

                <p style="margin:0;font-size:12px;color:#6b7280;">
                  Si no esperabas este correo, puedes ignorarlo.
                </p>
              </td>
            </tr>

            <tr>
              <td style="padding:14px 22px;border-top:1px solid #eef2f7;background:#fbfbfd;">
                <div style="font-size:12px;color:#6b7280;">
                  © ${new Date().getFullYear()} Phaseolus · ${appUrl}
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}


export function verifyEmailHtml(opts: { appUrl: string; verifyUrl: string; expiresHours: number }) {
  const { appUrl, verifyUrl, expiresHours } = opts;

  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#f5f6fb;font-family:Arial,Helvetica,sans-serif;color:#111827;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:28px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e5e7eb;">
            <tr>
              <td style="padding:18px 22px;border-bottom:1px solid #eef2f7;">
                <div style="font-size:12px;letter-spacing:0.08em;font-weight:700;">UNAM · Phaseolus</div>
              </td>
            </tr>
            <tr>
              <td style="padding:22px;">
                <h1 style="margin:0 0 10px 0;font-size:20px;">Confirma tu correo</h1>
                <p style="margin:0 0 14px 0;font-size:14px;line-height:1.6;color:#374151;">
                  Para activar tu cuenta, confirma tu correo. Este enlace expira en <strong>${expiresHours} horas</strong>.
                </p>
                <div style="margin:18px 0 18px 0;">
                  <a href="${verifyUrl}"
                     style="display:inline-block;background:#2563eb;color:#ffffff;text-decoration:none;font-weight:700;
                            padding:12px 16px;border-radius:999px;font-size:14px;">
                    Confirmar correo
                  </a>
                </div>
                <p style="margin:0 0 8px 0;font-size:12px;color:#6b7280;">Si el botón no funciona, copia y pega:</p>
                <p style="margin:0;font-size:12px;word-break:break-all;">${verifyUrl}</p>
              </td>
            </tr>
            <tr>
              <td style="padding:14px 22px;border-top:1px solid #eef2f7;background:#fbfbfd;">
                <div style="font-size:12px;color:#6b7280;">© ${new Date().getFullYear()} Phaseolus · ${appUrl}</div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}
