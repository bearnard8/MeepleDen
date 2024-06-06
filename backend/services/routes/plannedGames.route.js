import { Router } from "express";
import PlannedGame from "../models/plannedGame.model.js";
import Meeple from "../models/meeple.model.js";

export const plannedGamesRoute = Router();

// Get all planned games
plannedGamesRoute.get("/", async (req, res) => {
    let plannedGames = await PlannedGame.find({});
    res.send(plannedGames);
});

// Route to plan a game
plannedGamesRoute.post("/planGame", async (req, res, next) => {
    const { den, planner, game, date, location, status } = req.body;

    try {
        const newPlannedGame = new PlannedGame ({ den, planner, game, date, location, status });
        await newPlannedGame.save();
        res.status(201).json(newPlannedGame);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Route to get all planned games related to a given meeple
plannedGamesRoute.post("/", async (req, res, next) => {
    const { meepleId } = req.body;

    try {
        const meeple = await Meeple.findById(meepleId).populate("dens");

        if(!meeple) {
            return res.status(404).json({ error: "Meeple not found" });
        }

        const plannedGames = await PlannedGame.find({ den: { $in: meeple.dens } }).populate("den planner game");
        if (plannedGames.length === 0) res.status(200).json({message: "There are no games planned..."})

        res.json(plannedGames);
    } catch (error) {
        next(error);
    }
});

// Rout to update planned game status
plannedGamesRoute.put("/plannedGame/:id", async (req, res, next) => {
    const { status } = req.body;

    try {
        const plannedGame = await PlannedGame.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if(!plannedGame) {
            return res.status(404).json({ error: "Planned game not found" });
        }
        res.json(plannedGame);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});