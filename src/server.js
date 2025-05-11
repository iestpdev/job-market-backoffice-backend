import express from 'express';
import db from './config/mysql/mysql.js';
import studentRouter from './modules/students/routes/student.route.js';

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.student_path = '/api/student';

        this.connectDB();
        this.middlewares();
        this.routes();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`👾 I'M ALIVE => PORT: ${this.port}`);
        });
    }

    async connectDB() {
        await db.testConnection();
    }

    middlewares() {
        this.app.use(express.json());
    }

    routes() {
        this.app.use(this.student_path, studentRouter);
    }
}

export default Server;
