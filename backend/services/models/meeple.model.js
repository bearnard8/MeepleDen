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
            unique: true
        },
        dateOfRegistration: {
            type: Date,
            default: Date.now
        },
        avatar: {
            type: String,
            required: true
        }, 
        ownedGames: {
            type: Array, // array con gli id dei giochi
            required: true
        }, 
    },
    {
        collection: "meeples",
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