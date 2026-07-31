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