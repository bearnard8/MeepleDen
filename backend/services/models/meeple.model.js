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
            required: false,
            unique: true
        },
        password: {
            type: String,
        },
        email: {
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
        },
        wishedGames: [{
            type: Schema.Types.ObjectID,
            ref: "Game"
        }],
        dens: [{ 
            type: Schema.Types.ObjectId, 
            ref: 'Den' 
        }]
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