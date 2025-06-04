import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import db from "../../Config/DB.Config.js";
import { checkUserExists } from "../../Queries/Queries.js";

const login = async (req, res) => {


    const { email, username, password } = req.body;


    try {

        const userExists = await db.query(checkUserExists, [username, email]);

        if (!userExists.rows[0])
            return res.status(400).json({ message: `Invalid Credentials`, success: false })


        const isPasswordMatch = await bcrypt.compare(password, userExists.rows[0].password);


        if (!isPasswordMatch)
            return res.status(400).json({ message: `Invalid Credentials`, success: false })



        const token = jwt.sign({ id: userExists.rows[0].id }, process.env.JWT_SECRET, { expiresIn: "2d" });

        res.cookie("token", token, { maxAge: 2 * 24 * 60 * 60 * 1000, secure: process.env.ENVIRONMENT === 'production', httpOnly: true });


        return res.status(200).json({ message: `Login Successful`, success: true })







    } catch (error) {


        console.log(error);
        return res.status(500).json({ message: `Internal Server Error`, success: false })

    }





}

export default login;