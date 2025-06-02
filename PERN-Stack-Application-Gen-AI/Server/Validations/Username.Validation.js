export const checkUsername = (username) => {

    const usernameRegex = /^(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9_]{6,50}$/;
    return usernameRegex.test(username);
}

