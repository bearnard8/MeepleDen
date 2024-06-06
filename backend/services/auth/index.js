import jwt from "jsonwebtoken";
import Meeple from "../models/meeple.model.js";

export const generateJWT = (payload) =>  {
    return new Promise((res, rej) => 
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: "1 day" },
            (err, token) => {
                if (err) rej(err)
                else res(token)
            }
        )
    );
};

export const verifyJWT = (token) => {
    return new Promise((res, rej) => {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) rej(err)
            else res(decoded)
        });
    })
}

export const authMidd = async (req, res, next) => {
    try {
        const excludedPaths = ['/login', '/signup', '/googleLogin', `/callback`];

        if (excludedPaths.includes(req.path)) {
            return next();
        }

        if (!req.headers["authorization"]) return res.status(401).send({error: "Please login."})
        else {
            const decoded = await verifyJWT(
                req.headers["authorization"].replace("Bearer ", "")
            );
            if (decoded.exp) {
                delete decoded.iat;
                delete decoded.exp;
                const me = await Meeple.findOne({
                    ...decoded,
                });
                if (me) {
                    req.user = me;
                    next();
                } else res.status(401).send({ error: "Meeple not found."});
            } else res.status(401).send({ error: "Please login again"});
        }
    } catch (error) {
        console.error(error);
    }
}