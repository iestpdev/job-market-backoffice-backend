import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const defaultCorsOptions = {
  origin: process.env.ALLOWED_ORIGIN, 
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

const corsMiddleware = cors(defaultCorsOptions);

export default corsMiddleware;