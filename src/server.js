import express from 'express';
import morgan from 'morgan';
import corsMiddleware from './middleware/cors/cors.js';
import db from './config/mysql/mysql.js';

import studentRouter from './modules/students/routes/student.route.js';
import companyRouter from './modules/companies/routes/company.route.js';
import offerRouter from './modules/offers/routes/offer.route.js';
import candidacyRouter from './modules/candidacies/routes/candidacy.route.js';
import TutorRouter from './modules/tutors/routers/tutor.route.js';
import userRouter from './modules/users/routes/user.route.js';

import authRouter from './modules/auth/routes/auth.route.js';
import registerRouter from './modules/auth/routes/register.route.js';

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.student_path = '/api/v1/student';
        this.company_path = '/api/v1/company';
        this.offer_path = '/api/v1/offer';
        this.candidacy_path = '/api/v1/candidacy';
        this.user_path = '/api/v1/user';
        this.tutor_path = '/api/v1/tutor';

        this.auth_path = '/api/v1/auth';
        this.registet_path = '/api/v1/auth-register';

        this.connectDB();
        this.middlewares();
        this.routes();
        // TODO: Hacer un README para la documentación de como levantar el proyecto
        // TODO: Hacer una documentación de la api con swagger
        // TODO: Pruebas unitarias con Jest (devDependecies)
        // TODO: Checkear la logica de todos los updates (basarse en el update de user/controller) o de Company/Controller
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
        this.app.use(corsMiddleware);
        this.app.use(morgan('tiny'));
    }

    routes() {
        this.app.use(this.student_path, studentRouter);
        this.app.use(this.company_path, companyRouter);
        this.app.use(this.offer_path, offerRouter);
        this.app.use(this.candidacy_path, candidacyRouter);
        this.app.use(this.user_path, userRouter);
        this.app.use(this.tutor_path, TutorRouter);
        
        this.app.use(this.auth_path, authRouter);
        this.app.use(this.registet_path, registerRouter);
    }
}

export default Server;
