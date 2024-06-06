import { Schema, model } from "mongoose";

const gameSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        cover: {
            type: String,
            required: true,
        },
        releaseDate: {
            type: Date,
            required: true,
        },
        genre: {
            type: String,
            required: true,
        },
        developer: {
            type: String,
            required: true,
        },
        platform: {
            type: [String],
            required: true,
        },
        rating: {
            type: Number,
            min: 0,
            max: 10,
        },
        players: {
            min: {
                type: Number,
                required: true,
            },
            max: {
                type: Number,
                required: true,
            },
        },
        duration: {
            type: Number, // durata media della partita in minuti
            required: true,
        },
    },
    {
        collection: "games",
    }
)

export default model("Game", gameSchema)