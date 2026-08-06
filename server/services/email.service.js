import crypto from "crypto";

import transporter from "../config/mail.js";

export const sendEmail = async ({
    to,
    subject,
    html
}) => {

    await transporter.sendMail({

        from: `"GameForge" <${process.env.MAIL_USER}>`,

        to,

        subject,

        html

    });

};

export const sendVerificationEmail = async (user) => {

    // Generate plain token
    const token = crypto.randomBytes(32).toString("hex");

    // Hash token before storing
    const hashedToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");

    user.emailVerificationToken = hashedToken;

    user.emailVerificationExpires =
        new Date(Date.now() + 1000 * 60 * 60 * 24);

    await user.save({
        validateBeforeSave: false
    });

    // Send the plain token in the email
    const verificationUrl =
        `${process.env.CLIENT_URL}/verify-email/${token}`;

    await sendEmail({

        to: user.email,

        subject: "Verify your GameForge account",

        html: `
            <h2>Welcome to GameForge 🎮</h2>

            <p>Click the button below to verify your email.</p>

            <a
                href="${verificationUrl}"
                style="
                    display:inline-block;
                    padding:12px 20px;
                    background:#7c3aed;
                    color:white;
                    text-decoration:none;
                    border-radius:8px;
                    font-weight:bold;
                "
            >
                Verify Email
            </a>

            <p>This link expires in 24 hours.</p>
        `

    });

};

export const sendPasswordResetEmail = async (user, resetUrl) => {
    await sendEmail({
        to: user.email,
        subject: "GameForge — Reset Your Password",
        html: `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <style>
                body { margin:0; padding:0; background:#07000a; font-family:'Courier New',monospace; }
                .container { max-width:560px; margin:0 auto; padding:40px 20px; }
                .card { background:rgba(8,2,14,0.95); border:1px solid rgba(232,0,61,0.2); border-top:3px solid #e8003d; border-radius:16px; padding:40px; }
                .logo { font-size:22px; font-weight:700; color:#fff; letter-spacing:-0.02em; margin-bottom:8px; }
                .logo span { color:#e8003d; }
                .eyebrow { font-size:10px; letter-spacing:0.3em; color:rgba(255,255,255,0.35); text-transform:uppercase; margin-bottom:32px; }
                .title { font-size:28px; font-weight:700; color:#fff; margin-bottom:16px; letter-spacing:-0.02em; }
                .body { font-size:13px; color:rgba(255,255,255,0.55); line-height:1.8; margin-bottom:32px; }
                .btn { display:inline-block; padding:14px 32px; background:linear-gradient(135deg,#e8003d,#b5002e); color:#fff; text-decoration:none; border-radius:10px; font-size:13px; font-weight:700; letter-spacing:0.08em; }
                .divider { height:1px; background:linear-gradient(to right,#e8003d,rgba(192,192,192,0.2),transparent); margin:32px 0; }
                .footer { font-size:11px; color:rgba(255,255,255,0.2); text-align:center; margin-top:24px; }
                .warning { font-size:11px; color:rgba(255,200,0,0.6); margin-top:16px; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="card">
                    <div class="logo">Game<span>Forge</span></div>
                    <div class="eyebrow">// Password Reset</div>
                    <div class="title">Reset Your Password</div>
                    <div class="body">
                        Hey ${user.displayName || user.username},<br><br>
                        We received a request to reset your GameForge account password. Click the button below to set a new password. This link will expire in <strong style="color:#e8003d">30 minutes</strong>.
                    </div>
                    <a href="${resetUrl}" class="btn">RESET PASSWORD</a>
                    <div class="divider"></div>
                    <div class="warning">⚠️ If you did not request this password reset, please ignore this email. Your account remains secure.</div>
                </div>
                <div class="footer">© ${new Date().getFullYear()} GameForge Esports Platform. All rights reserved.</div>
            </div>
        </body>
        </html>
        `
    });
};