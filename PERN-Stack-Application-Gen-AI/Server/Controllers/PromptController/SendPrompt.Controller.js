import db from "../../Config/DB.Config.js";
import CloneAI from "../../Config/Gemini.Config.js";

import { createNewPrompt } from "../../Queries/Queries.js";

const sendPrompt = async (req, res) => {


    const { prompt, username } = req.body;
    const { userID } = req;

    if (!prompt || prompt.trim() === '')
        return res.status(400).json({ message: `Empty Prompt  Not Allowed`, success: false })

    if (!username)
        return res.status(400).json({ message: `Empty Username  Not Allowed`, success: false })




    try {

        const response = await CloneAI.models.generateContent({
            model: "gemini-2.0-flash",
            contents: prompt,
        });

        const aiRespose = response.text;

        console.log(aiRespose);



        const newPrompt = await db.query(createNewPrompt, [userID, username, prompt, aiRespose]);

        console.log(newPrompt);


        return res.status(201).json({ reply: aiRespose, success: true });









    } catch (error) {

        console.log(error);
        return res.status(500).json({ message: `Internal Server Error`, success: false })

    }



}

export default sendPrompt;