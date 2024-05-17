import { Router } from "express";
import Meeple from "../models/meeple.model.js";

export const meeplesRoute = Router();

meeplesRoute.get("/", async (req, res) => {
    let meeples = await Meeple.find({});
    res.send(meeples);
});

meeplesRoute.get("/:id", async (req, res, next) => {
    try {
        let meeple = await Meeple.findById(req.params.id);
        res.status(200).send(meeple);
    } catch (err) {
        next(err);
    }
});

meeplesRoute.post("/", async (req, res, next) => {
    try {
        let meeple = await Meeple.create(req.body);
        res.status(200).send(meeple);
        console.log("ciao");
    } catch (err) {
        next(err);
    }
});

meeplesRoute.put("/:id", async (req, res, next) => {
    try {
        let meeple = await Meeple.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.status(200).send(meeple);
    } catch (err) {
        next(err)
    }
});

meeplesRoute.delete("/:id", async (req, res, next) => {
    try {
        await Meeple.deleteOne({
            _id: req.params.id,
        });
        res.status(200).send(`The user has been deleted!`);
    } catch (err) {
        next(err);
    }
});

//meepleRoute.patch("/:id/avatar")