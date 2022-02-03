export const signupValidator = {
    userEmail: {
        isEmail: {
            errorMessage: 'Please provide a valid email.'
        },
        trim: true
    },
    userPassword: {
        isLength: {
            errorMessage: 'Password must be at least eight characters.',
            options: {min: 8}
        }
    }
};