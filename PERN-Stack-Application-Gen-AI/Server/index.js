import express from 'express'
import cors from 'cors';
import dotenv from 'dotenv';
import connect from './Config/Connect2DB.js';
import authRouter from './Routes/User.Route.js'
import promptRouter from './Routes/Prompt.Route.js'
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

const app = express();
dotenv.config();
const PORT = process.env.PORT;



app.use(cors({ origin: ['http://localhost:5173'], credentials: true }));
app.use(morgan('tiny'))
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use('/api/auth', authRouter);
app.use('/api/prompt', promptRouter)

connect();
app.listen(PORT, () => {

    console.log(`Server Listening On PORT ${PORT}`)
})

