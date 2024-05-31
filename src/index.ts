import express from "express";
import dispatcher from "./utils/dispatcher";
import cors from "cors";
import appConfig from "./configs/app";
import v1Router from "./routes";
import helmet from "helmet";
import connectDB from "./db/mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { createServer, Server } from "http";
import rateLimit from "express-rate-limit";
dotenv.config();

const app = express();

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(express.json());

// Routes
app.use(appConfig.apiV1URL, v1Router);

// Root endpoint
app.get("/", (req, res) => {
    const message = "Welcome to JH Backend Service";
    res.send(message);
    dispatcher.DispatchSuccessMessage(res, message);
});

let server: Server;

async function startServer() {
    try {
        // Connect to database
        await connectDB();

        // Start server
        const port = process.env.PORT || 8000;
        server = app.listen(port, () => {
            console.log(`Server listening at http://localhost:${port}`);
        });
    } catch (err: any) {
        console.error("Error starting server", err);
    }
}

const exitHandler = () => {
    if (server) {
        server.close(() => {
            console.log('Server closed');
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
};

const unexpectedErrorHandler = (error: Error) => {
    console.error(error);
    exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);
process.on('SIGTERM', () => {
    console.log('SIGTERM received');
    if (server) {
        server.close();
    }
});

// Start the server
startServer();

