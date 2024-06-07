import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { logger } from "./services/middlewares/logger.js";
import { config } from "dotenv";
import { densRoute } from "./services/routes/dens.routes.js";
import { meeplesRoute } from "./services/routes/meeples.routes.js";
import { gamesRoute } from "./services/routes/games.routes.js";
import { surveyRoute } from "./services/routes/survey.routes.js";
import { plannedGamesRoute } from "./services/routes/plannedGames.routes.js"
import { latestGamesRoute } from "./services/routes/latestGames.routes.js";
import {
    badRequestHandler,
    genericErrorHandler,
    notFoundHandler,
    unauthorizedHandler,
} from "./services/middlewares/errorHandler.js";
import { authMidd } from "./services/auth/index.js";
import passport from "passport";
import googleStrategy from "./services/auth/passport.js"

// .env file initialization
config();
const PORT = process.env.PORT || 3001;
const MONGO_URL = process.env.MONGO_URL;

const app = express();

app.use(cors());
app.use(express.json());
passport.use("google", googleStrategy);

app.use(logger);

// Routes
/*app.use("/api/dens", authMidd,  densRoute);
app.use("/api/meeples", authMidd,  meeplesRoute);
app.use("/api/games", authMidd,  gamesRoute);
app.use("/api/plannedGames", authMidd,  plannedGamesRoute);
app.use("/api/latestGames",  latestGamesRoute);*/

app.use("/api/dens", authMidd, densRoute);
app.use("/api/meeples", authMidd, meeplesRoute);
app.use("/api/games", authMidd, gamesRoute);
app.use("/api/plannedGames", authMidd, plannedGamesRoute);
app.use("/api/latestGames", authMidd, latestGamesRoute);
app.use("/api/survey", authMidd, surveyRoute);

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
