const verifyEmailTemplate = (name, url) => {

    return `

    <div
        style="
            background:#0B1220;
            padding:40px;
            color:white;
            font-family:Arial;
            border-radius:18px;
        "
    >

        <h1
            style="
                color:#06B6D4;
            "
        >

            Verify Your Email

        </h1>

        <p>

            Hello <b>${name}</b>,

        </p>

        <p>

            Welcome to GameForge!

        </p>

        <p>

            Please verify your email by clicking below.

        </p>

        <a

            href="${url}"

            style="
                display:inline-block;
                margin-top:20px;
                background:#06B6D4;
                color:white;
                padding:14px 24px;
                text-decoration:none;
                border-radius:10px;
                font-weight:bold;
            "

        >

            Verify Email

        </a>

        <p
            style="
                margin-top:30px;
                color:#94A3B8;
            "
        >

            Link expires in 24 hours.

        </p>

    </div>

    `;

};

export default verifyEmailTemplate;