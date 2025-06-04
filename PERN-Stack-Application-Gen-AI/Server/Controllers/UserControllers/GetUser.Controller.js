import db from "../../Config/DB.Config.js";
import { getUserData } from "../../Queries/Queries.js";

const getUser = async (req, res) => {


    const { userID } = req;

    if (!userID)
        return res.status(400).json({ message: `Invalid User`, success: false })


    try {

        const data = await db.query(getUserData, [userID]);

        if (!data.rows[0])
            return res.status(400).json({ message: `User Doesnt Exist`, success: false })

        return res.status(200).json({ userData: data, success: true })

    } catch (error) {

        console.log(error);
        return res.status(500).json({ message: `Internal Server Error`, success: false })

    }


}

export default getUser;