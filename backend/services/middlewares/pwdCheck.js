const validatePassword = (req, res, next) => {
    const { password } = req.body;

    if (password) {
        const hasMinLength = password.length >= 8;
        const hasNumber = /\d/.test(password); // .test checks if there is a correspondence between the criteria and the password
        const hasUppercase = /[A-Z]/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        if(!hasMinLength || !hasNumber || !hasUppercase || !hasSpecialChar) {
            return res.status(400).json({
                error: "Password must be at least 8 characters long and must contain at least one number, one uppercase letter, and one special character."
            });
        }
    }
    next();
};

export default validatePassword;