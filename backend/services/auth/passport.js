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
            const accessToken = await generateJWT({
                email: meeple.email
            })

            passportNext(null, {accessToken});
        } else {
            const newMeeple = new Meeple({
                nickname: email,
                googleId: sub,
                avatar: picture,
                email: email,
                name: given_name,
                surname: family_name
            });

            await newMeeple.save();
            const accessToken = await generateJWT({
                email: newMeeple.email
            });

            passportNext(null, {accessToken});
        }
        
    } catch (error) {
        passportNext(error);
    }
});

export default googleStrategy;