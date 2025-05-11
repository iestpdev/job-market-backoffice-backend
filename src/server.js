import express from 'express';
import db from './config/mysql/mysql.js';
//import labels from '../labels.js';
//import loginRoutes from '../routes/login.routes.js';
//import userRoutes from '../routes/user.routes.js';

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        // Paths
        //this.login_path = '/api/login';
        //this.user_path = '/api/user';

        this.connectDB();
        this.middlewares();
        this.routes();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`👾 I'M ALIVE => PORT: ${this.port}`);
            //console.log(labels.LISTEN_SERVER + this.port);
        });
    }

    async connectDB() {
        await db.testConnection();
    }

    middlewares() {
        this.app.use(express.json());
    }

    routes() {
        //this.app.use(this.login_path, loginRoutes);
        //this.app.use(this.user_path, userRoutes);
    }
}

export default Server;
