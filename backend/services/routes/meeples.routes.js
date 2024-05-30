import { Router } from "express";
import Meeple from "../models/meeple.model.js";
import Game from "../models/game.model.js";
import bcrypt from "bcryptjs";
import { authMidd, generateJWT } from "../auth/index.js";
import validatePassword from "../middlewares/pwdCheck.js";
import passport from "passport";

export const meeplesRoute = Router();

// Get all meeples
meeplesRoute.get("/", authMidd, async (req, res) => {
    let meeples = await Meeple.find({});
    res.send(meeples);
});

// Meeple regular login
meeplesRoute.post("/login", async ({body}, res, next) => {
    try {
        let foundMeeple = await Meeple.findOne({
            email: body.email,
        })
        console.log(foundMeeple);
        console.log(body.email);
        if (foundMeeple) {
            const matching = await bcrypt.compare(body.password, foundMeeple.password)
            if (matching) {
                const token = await generateJWT({
                    email: foundMeeple.email
                })
                res.send(JSON.stringify({ meeple: foundMeeple , token}))
            } else res.status(401).send("Wrong password.");
        } else res.status(400).send("Meeple does not exists."); //! non va
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

// gAuth Route
meeplesRoute.get("/googleLogin", passport.authenticate(
        "google", 
        { scope: ["profile", "email"]})
);

// gAuth callback
meeplesRoute.get("/callback", passport.authenticate("google", {session: false}) , (req, res, next) => {
        try {
            res.redirect(`http://localhost:3000/profile?accessToken=${req.user.accToken}`)
        } catch(err) {
            next(err);
        }
    }
)

// Create new meeple
meeplesRoute.post("/signup", validatePassword, async (req, res, next) => {
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

// Edit meeple with specified :id
meeplesRoute.put("/:id", authMidd, async (req, res, next) => {
    try {
        let meeple = await Meeple.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.status(200).send(meeple);
    } catch (err) {
        next(err)
    }
});

// Get meeple with specified :id
meeplesRoute.get("/:id", authMidd, async (req, res, next) => {
    try {
        let meeple = await Meeple.findById(req.params.id);
        res.status(200).send(meeple);
    } catch (err) {
        next(err);
    }
});

// Delete existing meeple with specified :id
meeplesRoute.delete("/:id", authMidd, async (req, res, next) => {
    try {
        await Meeple.deleteOne({
            _id: req.params.id,
        });
        res.status(200).send(`The user has been deleted!`);
    } catch (err) {
        next(err);
    }
});

// Add game to meeple's wishlist
meeplesRoute.put("/meeples/:id/wishedGames", authMidd, async (req, res, next) => {
    const { gameId } = req.body;

    try {
        const game = await Game.findById(gameId);
        if(!game) return res.send(404).json({error: "Game not found"});

        const meeple = await Meeple.findByIdAndUpdate(
            req.params.meeple,
            { $addToSet: { wishedGames: gameId } },
            { new: true, runValidators: true }
        );
        if(!meeple) return res.status(404).json({error: "Meeple not found"});

        res.json(meeple);
    } catch(error) {
        res.status(500).json({ error: "Server error" });
    }
});