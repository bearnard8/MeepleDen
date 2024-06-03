import { Router } from "express";
import Game from "../models/game.model.js";

export const latestGamesRoute = Router();

latestGamesRoute.get("/", async (req, res, next) => {
    try {
        const latestGames = await Game.find().sort({ releaseDate: -1 }).limit(10);
        res.json(latestGames);
        console.log(latestGames);
    } catch (error) {
        next(error);
    }
});