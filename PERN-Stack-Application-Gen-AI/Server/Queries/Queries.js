export const checkUsernameExists = `SELECT * FROM users WHERE username=$1`;
export const checkEmailExists = `SELECT * FROM users WHERE email=$1`;
export const createNewUser = `INSERT INTO users(first_name,last_name,email,username,country,password)
VALUES($1,$2,$3,$4,$5,$6)`
export const checkUserExists = `SELECT * FROM users WHERE username=$1 AND email=$2`;
export const createNewPrompt = `INSERT INTO prompts(userid,createdby,prompttext,promptresponse)VALUES($1,$2,$3,$4)`;
export const getUserData = `SELECT first_name,last_name,email,username,country FROM users WHERE id=$1`