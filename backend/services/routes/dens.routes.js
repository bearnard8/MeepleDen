import { Router } from "express";
import Den from "../models/den.model.js";

export const densRoute = Router();

densRoute.get("/", async (req, res) => {
    let dens = await Den.find({});
    res.send(dens);
});

densRoute.get("/:id", async (req, res, next) => {
    try {
        let den = await Den.findById(req.params.id);
        res.status(200).send(den);
    } catch (err) {
        next(err);
    }
});

densRoute.post("/", async (req, res, next) => {
    try {
        let den = await Den.create(req.body);
        res.status(200).send(den);
    } catch (err) {
        next(err);
    }
});

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

// Routes to add a meeple to a den
densRoute.put("/:id/addMeeple", async (req, res, next) => {
    const { denId } = req.params;
    const { meepleId } = req.body;

    try{
        const den = await Den.findById(denId);
        const meeple = await Meeple.findById(meepleId);

        if (!den || !meeple) {
            return res.status(404).json({ message: `Den or Meeple not found` });
        }

        if (!den.members.includes(meepleId)) {
            den.members.push(meepleId);
            await den.save();
        }

        res.status(200).json(den);
    } catch (err) {
        res.status(500).json({ message: error.message });
    }
});


//densRoute.patch("/:id/avatar")