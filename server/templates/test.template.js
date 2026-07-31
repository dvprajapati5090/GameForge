const testEmailTemplate = (name) => {

    return `

        <div
            style="
                font-family:Arial,sans-serif;
                background:#0F172A;
                color:white;
                padding:40px;
                border-radius:16px;
            "
        >

            <h1
                style="
                    color:#06B6D4;
                "
            >
                🎮 Welcome to GameForge
            </h1>

            <p>

                Hello <b>${name}</b>,

            </p>

            <p>

                Congratulations!

                Your GameForge email service is working successfully.

            </p>

            <p>

                Happy Gaming 🚀

            </p>

        </div>

    `;

};

export default testEmailTemplate;