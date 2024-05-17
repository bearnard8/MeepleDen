import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { logger } from "./services/middlewares/logger.js";
import { config } from "dotenv";
import { densRoute } from "./services/routes/dens.routes.js";
import { meeplesRoute } from "./services/routes/meeples.routes.js";
import {
    badRequestHandler,
    genericErrorHandler,
    notFoundHandler,
    unauthorizedHandler,
} from "./services/middlewares/errorHandler.js";

// .env file initialization
config();
const PORT = process.env.PORT || 3001;
const MONGO_URL = process.env.MONGO_URL;

const app = express();

app.use(express.json());
app.use(cors());

app.use(logger);

// Routes
app.use("/api/dens", densRoute);
app.use("/api/meeples", meeplesRoute);

// Error Middlewares
app.use(badRequestHandler);
app.use(unauthorizedHandler);
app.use(notFoundHandler);
app.use(genericErrorHandler);

// Server initialization
const initServer = async () => {
    try {
        await mongoose.connect(MONGO_URL);
        console.log("Sono connesso al database")

        app.listen(PORT, () => {
            console.log(`server avviato alla porta ${PORT}`)
        })
    } catch (err) {
        console.log("Connessione al database fallita!", err)
    }
}

initServer();
