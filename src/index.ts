import cors from 'cors';
import express, { Application } from 'express';
import helmet from 'helmet';
import http from 'http';
import { connectToDb } from './connections';
import { initializeProjectSettings } from './middleware/initilizeProjectSettings';
import { envSettings } from './utils/env.config';

if (!envSettings.serverPort) {
    process.exit(1);
}

const app: Application = express();
const server = http.createServer(app);

app.use(
    cors({
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: false, // Allow cookies to be sent with the request
    }),
);
app.use(helmet());
app.use((req: express.Request, res: express.Response, next: express.NextFunction): void => {
    if (req.originalUrl === '/payment-checkout/webhook') {
        next();
    } else {
        express.json()(req, res, next);
    }
});

app.use(express.urlencoded({ extended: false }));

// Custom Middleware
// app.use(isValidHeader);
app.use(initializeProjectSettings);

app.get('/', (req, res) => {
    res.send('vDoctor is live with Docker and CI/CD in dev branch!!!');
});

// user routes

server.listen(envSettings.serverPort, async () => {
    try {
        const { success, message } = await connectToDb();

        // await mainSocket(server);

        if (success) {
            console.log(message);
            console.log(`Connected to server at port ${envSettings.serverPort}`);
        }
    } catch (error: any) {
        console.log(error.message);
        process.exit(1);
    }
});
