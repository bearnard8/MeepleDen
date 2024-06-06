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
            required: true,
            unique: true
        },
        avatar: {
            type: String,
            required: false
        }, 
        ownedGames: [{ 
            type: Schema.Types.ObjectId, 
            ref: 'Game' 
        }], 
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
        }],
        plannedGames: [{ 
            type: Schema.Types.ObjectId, 
            ref: 'PlannedGame' 
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