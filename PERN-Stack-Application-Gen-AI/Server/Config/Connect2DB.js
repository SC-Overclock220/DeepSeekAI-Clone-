import dotenv from 'dotenv';
import db from './DB.Config.js';
import { createUserTable } from '../Models/User.Model.js';
import { createPromptTable } from '../Models/Prompt.Model.js';


dotenv.config();


const connect = async () => {

    try {

        console.log(`Attempting Connecting To DB---`);
        await db.connect();
        console.log(`###########---Connected To DB---###########`);


        // Executing Scripts

        console.log(`Executing Scripts`);
        await db.query(createUserTable);
        await db.query(createPromptTable);

    } catch (error) {

        console.log(error);
        throw new Error(error.message);

    }



}

export default connect;