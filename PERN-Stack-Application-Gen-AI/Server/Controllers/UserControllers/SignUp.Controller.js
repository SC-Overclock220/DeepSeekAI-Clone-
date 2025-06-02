import db from "../../Config/DB.Config.js";
import { checkEmailExists, checkUsernameExists, createNewUser } from "../../Queries/Queries.js";
import { checkEmail } from "../../Validations/Email.Validation.js";
import { checkPassword } from "../../Validations/Password.Validations.js";
import { checkUsername } from "../../Validations/Username.Validation.js";
import bcrypt from 'bcryptjs'

const signup = async (req, res) => {


    const { firstname, lastname, username, password, country, email } = req.body;


    if (!firstname || !lastname || !username || !password || !country || !email)
        return res.status(400).json({ message: `None of the required fields can be empty`, success: false })

    if (!checkEmail(email))
        return res.status(400).json({ message: 'Invalid Email.Please Use A Valid One', success: false });

    if (!checkUsername(username))
        return res.status(400).json({ message: 'Username Doesnt Satisfy Required Criteria', success: false });

    if (!checkPassword(password))
        return res.status(400).json({ message: 'Password Doesnt Satisfy Required Criteria', success: false });


    try {

        const usernameExists = await db.query(checkUsernameExists, [username]);

        if (usernameExists.rows[0])
            return res.status(400).json({ message: `An Account With This Username Already Exists`, success: false });

        const emailExists = await db.query(checkEmailExists, [email]);

        if (emailExists.rows[0])
            return res.status(400).json({ message: `An Account With This Email Already Exists`, success: false });


        const hashedPassword = await bcrypt.hash(password, 12);


        const newUser = await db.query(createNewUser, [String(firstname).toLowerCase(), String(lastname).toLowerCase(), email, username, String(country).toLowerCase(), hashedPassword]);

        console.log(newUser);


        return res.status(201).json({ message: `User Created Successfully`, success: true })




    } catch (error) {

        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error', success: false })

    }






}

export default signup;