import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();

console.log(process.env.JWT_SECRET);
const auth = async (req, res, next) => {



    try {

        const { token } = req.cookies;


        console.log(token);

        if (!token)
            return res.status(401).json({ message: "Token Not Found. Unauthorized Access", success: false });


        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        if (!decodedToken) {
            return res.status(401).json({ message: "Bad Token. Please Login Again", success: false });

        }
        console.log(decodedToken);


        req.userID = decodedToken.id;

        next();

    } catch (error) {

        console.log(error);
        return res.status(500).json({ message: `Internal Server Error`, success: false });

    }


}

export default auth;