export const validateRegistration = (username: string, email: string, password: string) => {

    const errors: {
        username?: string
        password?: string
        email?: string
    } = {};

    if (!username) {
        errors.username = 'Username must not be empty';
    } else if (username.length < 6) {
        errors.username = 'Username must be at least 6 characters long';
    } else if (username.length > 32) {
        errors.username = 'Username must be at most 32 characters long';
    }

    if (!email) {
        errors.email = 'Email must not be empty';
    } else {
        const regEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!email.match(regEx)) {
            errors.email = 'Email must be a valid email address';
        }
    }

    if (!password) {
        errors.password = 'Password must not be empty';
    } else if (password.length < 6) {
        errors.password = 'Password must be at least 6 characters long';
    } else if (password.length > 32) {
        errors.password = 'Password must be at most 32 characters long';
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    };
}