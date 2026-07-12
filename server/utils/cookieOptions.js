const cookieOptions = {
    httpOnly: true,
    secure: false,      // Change to true when deployed with HTTPS
    sameSite: "lax",
};

export default cookieOptions;