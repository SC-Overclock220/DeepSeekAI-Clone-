import dotenv from 'dotenv';
import { GoogleGenAI } from "@google/genai";
dotenv.config();


const CloneAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default CloneAI;