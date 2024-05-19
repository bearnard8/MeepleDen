import { Schema, model } from "mongoose";

const meepleSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        surname: {
            type: String,
            required: true
        },
        nickname: {
            type: String,
            required: true,
            unique: false
        },
        password: {
            type: String,
            required: false
        },
        mail: {
            type: String,
            required: true
        },
        avatar: {
            type: String,
            required: false
        }, 
        ownedGames: {
            type: Array, // array con gli id dei giochi
            required: false
        }, 
        googleId: {
            type: String,
            required: false
        }
    },
    {
        collection: "meeples",
        timestamps: true
    }
);

export default model("Meeple", meepleSchema);

// id: "string"  
// name: "string"  
// surname: "string"  
// username: "string"  
// avatar: "image"  
// ownedGames: [  
// ]  