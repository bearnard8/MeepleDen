import { Schema, model } from 'mongoose';

const surveySchema = new Schema(
    {
        den: { 
            type: Schema.Types.ObjectId, 
            ref: 'Den', 
            required: true 
        },
        creator: { 
            type: Schema.Types.ObjectId, 
            ref: 'Meeple', 
            required: true 
        },
        gameOptions: [{ 
            type: Schema.Types.ObjectId, 
            ref: 'Game', 
            required: true 
        }],
        dateOptions: [{
            date: { 
                type: Date, 
                required: true 
            },
            time: { 
                type: String, 
                required: true 
            }
        }],
        responses: [{
            meeple: { 
                type: Schema.Types.ObjectId, 
                ref: 'Meeple' 
            },
            selectedGame: { 
                type: Schema.Types.ObjectId, 
                ref: 'Game' 
            },
            selectedDateOption: { type: Number }
        }],
        closed: { type: Boolean, default: false }
    },
    {
        collection: "surveys",
        timestamps: true
    }
);

export default model('Survey', surveySchema);
