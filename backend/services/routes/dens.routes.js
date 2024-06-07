import { Router } from "express";
import Den from "../models/den.model.js";
import Game from "../models/game.model.js";
import Meeple from "../models/meeple.model.js"

export const densRoute = Router();

// Get all dens
densRoute.get("/", async (req, res) => {
    let dens = await Den.find({});
    res.send(dens);
});

// Create a new den 
densRoute.post("/create", async (req, res, next) => {
    try {
        const { name, description, owner } = req.body;

        const newDen = new Den({ name, description, owner, vipStatus: false, members: [owner] });
        await newDen.save();

        await Meeple.findByIdAndUpdate(owner, { $addToSet: { dens: newDen._id } });

        res.status(201).json(newDen);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create den', error });
    }
});

// Get den with specified :id
densRoute.get("/:id", async (req, res, next) => {
    try {
        let den = await Den.findById(req.params.id)
            .populate("members", "nickname")
            .populate("ownedGames", "name")
            .populate({
                path: "plannedGames",
                populate: { path: "game", select: "name" }
            })
        if (!den) {
            res.status(404).json({ error: "Den not found" });
        }
        res.status(200).send(den);
    } catch (err) {
        next(err);
    }
});

// Modify existing den with specified :id
densRoute.put("/:id", async (req, res, next) => {
    try {
        let den = await Den.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.status(200).send(den);
    } catch (err) {
        next(err)
    }
});

// Delete existing den with specified :id
densRoute.delete("/:id", async (req, res, next) => {
    try {
        await Den.deleteOne({
            _id: req.params.id,
        });
        res.status(200).send(`${req.params.name} has been deleted!`);
    } catch (err) {
        next(err);
    }
});

// Add meeple to a den
densRoute.post("/:denId/addMeeple", async (req, res) => {
    try {
        const { denId } = req.params;
        const { nickname } = req.body;

        // Trova il meeple per nickname
        const meeple = await Meeple.findOne({ nickname });
        if (!meeple) {
            return res.status(404).json({ message: 'Meeple not found' });
        }

        // Aggiungi il meeple al den
        const den = await Den.findByIdAndUpdate(
            denId,
            { $addToSet: { members: meeple._id } },
            { new: true }
        ).populate('members');

        // Aggiungi il den al meeple
        await Meeple.findByIdAndUpdate(meeple._id, { $addToSet: { dens: denId } });

        res.status(200).json(den);
    } catch (error) {
        res.status(500).json({ message: 'Failed to add meeple', error });
    }
});

// Remove meeple from a den
densRoute.post('/:denId/removeMeeple', async (req, res) => {
    try {
        const { denId } = req.params;
        const { meepleId } = req.body;

        const den = await Den.findByIdAndUpdate(
            denId,
            { $pull: { members: meepleId } },
            { new: true }
        ).populate('members');

        await Meeple.findByIdAndUpdate(meepleId, { $pull: { dens: denId } });

        res.status(200).json(den);
    } catch (error) {
        res.status(500).json({ message: 'Failed to remove meeple', error });
    }
});

// Add game to ownedGames of a den
densRoute.put("/:id/addGame", async (req, res, next) => {
    const denId = req.params.id;
    const { gameId } = req.body;

    try {
        const den = await Den.findById(denId);
        const game = await Game.findById(gameId);

        if (!den || !game) {
            return res.status(404).json({ message: "Den or Game not found" });
        }

        if (!den.ownedGames.includes(gameId)) {
            den.ownedGames.push(gameId);;
            await den.save();
        }

        res.status(200).json(den);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

// Add game to den's wishlist
densRoute.put("/dens/:id/wishedGames", async (req, res, next) => {
    const { gameId } = req.body;

    try {
        const game = await Game.findById(gameId);
        if(!game) return res.send(404).json({error: "Game not found"});

        const den = await Den.findByIdAndUpdate(
            req.params.den_id,
            { $addToSet: { wishedGames: gameId } },
            { new: true, runValidators: true }
        );
        if(!den) return res.status(404).json({error: "Den not found"});

        res.json(den);
    } catch(error) {
        res.status(500).json({ error: "Server error" });
    }
});