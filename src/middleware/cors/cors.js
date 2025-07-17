import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const allowedOrigins = [
  process.env.ALLOWED_ORIGIN_ADMIN,
  process.env.ALLOWED_ORIGIN_CLIENT
];

const defaultCorsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

const corsMiddleware = cors(defaultCorsOptions);

export default corsMiddleware;
