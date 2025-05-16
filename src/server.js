import express from 'express';
import db from './config/mysql/mysql.js';
import studentRouter from './modules/students/routes/student.route.js';
import companyRouter from './modules/companies/routes/company.route.js';
import offerRouter from './modules/offers/routes/offer.route.js';
import candidacyRouter from './modules/candidacies/routes/candidacy.route.js';
import userRouter from './modules/users/routes/user.route.js';
import authRouter from './modules/auth/routes/auth.route.js';

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.student_path = '/api/v1/student';
        this.company_path = '/api/v1/company';
        this.offer_path = '/api/v1/offer';
        this.candidacy_path = '/api/v1/candidacy';
        this.user_path = '/api/v1/user';
        this.auth_path = '/api/v1/auth';

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
        this.app.use(this.company_path, companyRouter);
        this.app.use(this.offer_path, offerRouter);
        this.app.use(this.candidacy_path, candidacyRouter);
        this.app.use(this.user_path, userRouter);
        this.app.use(this.auth_path, authRouter);
    }
}

export default Server;
