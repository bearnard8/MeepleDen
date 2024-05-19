import GoogleStrategy from "passport-google-oauth20";
import "dotenv/config";
import Meeple from "../models/meeple.model.js";
import { generateJWT } from "./index.js";

const options = {
    clientID: process.env.G_CLIENT_ID,
    clientSecret: process.env.G_CLIENT_SECRET,
    callbackURL: process.env.G_CB
}
const googleStrategy = new GoogleStrategy(options, async(_accessToken, _refreshToken, profile, passportNext) => {
    
    try {
        const { email, given_name, family_name, sub, picture } = profile._json;
        const meeple = await Meeple.findOne({email});
        if (meeple) {
            const accToken = await createAccessToken({
                _id: meeple._id
            })

            passportNext(null, {accToken});
        } else {
            const newMeeple = new Meeple({
                username: email,
                googleId: sub
            });

            await newMeeple.save();
            const accToken = await generateJWT({
                username: newMeeple.username
            });

            passportNext(null, {accToken});
        }
        
    } catch (error) {
        passportNext(error);
    }
});

export default googleStrategy;