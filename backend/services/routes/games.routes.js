import { Router } from "express";
import Game from "../models/game.model.js";

export const gamesRoute = Router();

gamesRoute.get("/", async (req, res) => {
    let games = await Game.find({});
    res.send(games);
});

gamesRoute.get("/search", async (req, res, next) => {
    try {
        const query = req.query.query;
        if (typeof query !== "string" || query.trim() === "") {
            return res.status(400).json({ error: "Invalid search query" });    
        }
        const games = await Game.find({ name: { $regex: query, $options: 'i' } });
        res.json(games);
    } catch (error) {
        next(error);
    }
});

gamesRoute.get("/:id", async (req, res, next) => {
    try {
        let game = await Game.findById(req.params.id);
        res.status(200).send(game);
    } catch (err) {
        next(err);
    }
});

gamesRoute.post("/", async (req, res, next) => {
    try {
        let game = await Game.create(req.body);
        res.status(200).send(game);
    } catch (err) {
        next(err);
    }
});

gamesRoute.put("/:id", async (req, res, next) => {
    try {
        let game = await Game.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.status(200).send(game);
    } catch (err) {
        next(err)
    }
});

gamesRoute.delete("/:id", async (req, res, next) => {
    try {
        await Game.deleteOne({
            _id: req.params.id,
        });
        res.status(200).send(`${req.params.name} has been deleted!`);
    } catch (err) {
        next(err);
    }
});

