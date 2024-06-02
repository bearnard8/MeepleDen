import mongoose from 'mongoose';

const plannedGameSchema = new mongoose.Schema({
  den: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Den',
    required: true
  },
  planner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Meeple',
    required: true
  },
  game: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Game',
    required: true
  },
  date: {
    type: Date,
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

export default mongoose.model('PlannedGame', plannedGameSchema);
