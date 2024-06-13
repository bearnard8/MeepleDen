import mongoose from "mongoose";
import { Router } from "express";
import Meeple from "../models/meeple.model.js";
import Game from "../models/game.model.js";
import bcrypt from "bcryptjs";
import { generateJWT } from "../auth/index.js";
import validatePassword from "../middlewares/pwdCheck.js";
import passport from "passport";
import { parser } from '../auth/cloudinaryConfig.js';

export const meeplesRoute = Router();

// Get all meeples
meeplesRoute.get("/", async (req, res) => {
    let meeples = await Meeple.find({});
    res.send(meeples);
});

// Meeple regular login
meeplesRoute.post("/login", async ({body}, res, next) => {
    try {
        let foundMeeple = await Meeple.findOne({
            email: body.email,
        })
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

// gAuth Route
meeplesRoute.get("/googleLogin", passport.authenticate(
        "google", 
        { scope: ["profile", "email"]})
);

// gAuth callback
meeplesRoute.get("/callback", passport.authenticate("google", {session: false}) , (req, res, next) => {
        try {
            //res.redirect(`http://localhost:3000/profile?accessToken=${req.user.accToken}`)
            res.redirect(`http://localhost:3000/?accessToken=${req.user.accessToken}`)
        } catch(err) {
            next(err);
        }
    }
)

// Create new meeple
/*meeplesRoute.post("/signup", validatePassword, async (req, res, next) => {
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
});*/

meeplesRoute.post("/signup", validatePassword, async (req, res, next) => {
    try {
        console.log('Signup request received', req.body);
        const { name, surname, nickname, email, password, avatar } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const newMeeple = new Meeple({
            name,
            surname,
            nickname,
            email,
            password: hashedPassword,
            avatar
        });

        await newMeeple.save();

        const token = generateJWT({
            email: newMeeple.email
        })

        // invio mail automatica alla registrazione (se necessario)
        res.status(200).json({ meeple: newMeeple, token });
    } catch (err) {
        next(err);
    }
});

// Edit meeple with specified :id
meeplesRoute.put("/:meepleId", async (req, res, next) => {
    try {
        const { meepleId } = req.params;
        // Controlla se l'ID è un ObjectId valido
        if (!mongoose.Types.ObjectId.isValid(meepleId)) {
            return res.status(400).json({ message: "Invalid meeple ID" });
        }

        const updatedMeeple = await Meeple.findByIdAndUpdate(meepleId, req.body, { new: true });
        res.status(200).json(updatedMeeple);
    } catch (err) {
        next(err);
    }
});

// Get meeple with specified :id
meeplesRoute.get("/:id", async (req, res, next) => {
    try {
        const meeple = await Meeple.findById(req.params.id)
            .populate('dens', 'name')
            .populate({
                path: "plannedGames",
                populate: { path: "game", select: "name" }
            })
            .populate("ownedGames", "name")
            .populate("wishedGames", "name");
        if (!meeple) {
            res.status(404).json({ error: "Meeple not found" });
        }
        res.status(200).send(meeple);
    } catch (err) {
        next(err);
    }
});

// Get meeple with specified :email
meeplesRoute.get('/:email', async (req, res, next) => {
    try {
        const meeple = await Meeple.findOne({ email: req.params.email })
            .populate('dens', 'name');
        if (!meeple) {
            return res.status(404).json({ error: 'Meeple not found' });
        }
        res.json(meeple);
    } catch (error) {
        next(error);
    }
});

// Delete existing meeple with specified :id
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

// Add game to ownedGames of a meeple
meeplesRoute.put("/:id/ownedGames", async (req, res) => {
    const meepleId = req.params.id;
    const { gameId } = req.body;

    try {
        const meeple = await Meeple.findById(meepleId);
        const game = await Game.findById(gameId);

        if (!meeple || !game) {
            return res.status(404).json({ message: "Meeple or Game not found" });
        }

        if (!meeple.ownedGames.includes(gameId)) {
            meeple.ownedGames.push(gameId);;
            await meeple.save();
        }

        res.status(200).json(meeple);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

// Add game to wishedGames of a meeple
meeplesRoute.put("/:id/wishedGames", async (req, res) => {
    const meepleId = req.params.id;
    const { gameId } = req.body;

    try {
        const meeple = await Meeple.findById(meepleId);
        const game = await Game.findById(gameId);

        if (!meeple || !game) {
            return res.status(404).json({ message: "Meeple or Game not found" });
        }

        if (!meeple.wishedGames.includes(gameId)) {
            meeple.wishedGames.push(gameId);;
            await meeple.save();
        }

        res.status(200).json(meeple);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

// Route to remove a game from ownedGames
meeplesRoute.post('/:id/removeOwnedGame', async (req, res, next) => {
    try {
        const { gameId } = req.body;
        const meeple = await Meeple.findByIdAndUpdate(
            req.params.id,
            { $pull: { ownedGames: gameId } }, 
            { new: true }
        ).populate('ownedGames', 'name').populate('wishedGames', 'name'); 
        res.json(meeple);
    } catch (error) {
        next(error);
    }
});

// Route to remove a game from wishedGames
meeplesRoute.post('/:id/removeWishedGame', async (req, res, next) => {
    try {
        const { gameId } = req.body;
        const meeple = await Meeple.findByIdAndUpdate(
            req.params.id,
            { $pull: { wishedGames: gameId } }, 
            { new: true }
        ).populate('ownedGames', 'name').populate('wishedGames', 'name'); 
        res.json(meeple);
    } catch (error) {
        next(error);
    }
});

// Route to update meeple's avatar
meeplesRoute.put('/:meepleId/avatar', parser.single('avatar'), async (req, res) => {
    try {
        const { meepleId } = req.params;
        const avatar = req.file.path;

        const updatedMeeple = await Meeple.findByIdAndUpdate(meepleId, { avatar }, { new: true });

        if (!updatedMeeple) {
            return res.status(404).json({ message: 'Meeple not found' });
        }

        res.status(200).json(updatedMeeple);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update avatar', error });
    }
});