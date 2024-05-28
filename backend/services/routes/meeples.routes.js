import { Router } from "express";
import Meeple from "../models/meeple.model.js";
import bcrypt from "bcryptjs";
import { authMidd, generateJWT } from "../auth/index.js";
import passport from "passport";

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

meeplesRoute.post("/login", async ({body}, res, next) => {
    try {
        let foundMeeple = await Meeple.findOne({
            email: body.email,
        })
        if (foundMeeple) {
            const matching = await bcrypt.compare(body.password, foundMeeple.password)
            if (matching) {
                const token = await generateJWT({
                    lastName: foundMeeple.lastName,
                    email: foundMeeple.email
                })
                res.send({ user: foundMeeple , token})
            } else res.status(401).send("Wrong password.");
        } else res.status(400).send("Meeple does not exists."); // non va
    } catch (err) {
        next(err);
    }
})

/* da verificare
meeplesRoute.get("/me", authMidd, async (req, res, next) =>{
    try {
        let meeple = await Meeple.findById(req.user.id);
        res.send(meeple);
    } catch (err) {
        next(err);
    }
})
*/

meeplesRoute.get(
    "/googleLogin", 
    passport.authenticate(
        "google", 
        { scope: ["profile", "email"]})
);

meeplesRoute.get("/callback", passport.authenticate("google", {session: false}) , (req, res, next) => {
        try {
            res.redirect(`http://localhost:3000/profile?accessToken=${req.user.accToken}`)
        } catch(err) {
            next(err);
        }
    }
)

meeplesRoute.post("/", async (req, res, next) => {
    try {
        let meeple = await Meeple.create({
            ...req.body,
            password: await bcrypt.hash(req.body.password, 10),
        });
        // invio mail automatica alla registrazione
        res.status(200).send(meeple);
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

// meepleRoute.patch("/:id/avatar")