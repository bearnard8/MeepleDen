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
        dateOfCreation: {
            type: Date,
            required: true,
            default: Date.now
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
        }
    },
    {
        collection: "dens",
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