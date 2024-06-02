import { Router } from "express";
import PlannedGame from "../models/plannedGame.model";
import Meeple from "../models/meeple.model";

export const plannedGamesRoute = Router();

// Route to plan a game
plannedGamesRoute.post("/plannedGames", async (req, res) => {
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
plannedGamesRoute.get("/plannedGames", async (req, res) => {
    const meepleId = req.meeple._id;

    try {
        const meeple = await Meeple.findById(meepleId).populate("dens");

        if(!meeple) {
            return res.status(404).json({ error: "Meeple not found" });
        }

        const plannedGames = await PlannedGame.find({ den: { $in: meeple.dens } }).populate("den planner game");

        res.json(plannedGames);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Rout to update planned game status
plannedGamesRoute.put("/plannedGame/:id", async (req, res, next) => {
    const { status } = req.body;

    try {
        const plannedGame = await PlannedGame.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if(!plannedGames) {
            return res.status(404).json({ error: "Planned game not found" });
        }
        res.json(plannedGame);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});