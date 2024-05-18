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
        password: {
            type: String,
            required: true
        },
        mail: {
            type: String,
            required: true
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