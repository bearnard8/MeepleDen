import { Schema, model } from 'mongoose';

const plannedGameSchema = new Schema({
  den: {
    type: Schema.Types.ObjectId,
    ref: 'Den',
    required: true
  },
  planner: {
    type: Schema.Types.ObjectId,
    ref: 'Meeple',
    required: true
  },
  game: {
    type: Schema.Types.ObjectId,
    ref: 'Game',
    required: true
  },
  date: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["planned", "played", "canceled", "postponed"],
    default: "planned"
  }
}, {
  collection: 'plannedGames',
  timestamps: true
});

export default model('PlannedGame', plannedGameSchema);
