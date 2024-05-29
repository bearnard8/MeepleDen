import { Schema, model } from "mongoose";

const denSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "Meeple"
        },
        vipStatus: {
            type: Boolean,
            required: true
        },
        members: [{
            type: Schema.Types.ObjectID,
            ref: "Meeple"
        }],
        denAvatar: {
            type: String,
            required: true
        },
        ownedGames: [{
            type: Schema.Types.ObjectID,
            ref: "Game"
        }],
        wishedGames: [{
            type: Schema.Types.ObjectID,
            ref: "Game"
        }]
    },
    {
        collection: "dens",
        timestamps: true
    }
);

export default model("Den", denSchema);


// id: "string"  
// name: "string"  
// owner: "string"
// members: "array"
// dateOfCreation: "string"  
// vipStatus: "boolean" 
// denAvatar: "string"