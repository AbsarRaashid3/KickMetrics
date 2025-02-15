import mongoose from 'mongoose';

const playerSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  full_name: {
    type: String,
    required: true,
  },
  birth_date: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  height_cm: {
    type: Number,
    required: true,
  },
  weight_kgs: {
    type: Number,
    required: true,
  },
  positions: {
    type: String,
    required: true,
  },
  nationality: {
    type: String,
    required: true,
  },
  overall_rating: {
    type: Number,
    required: true,
  },
  potential: {
    type: Number,
    required: true,
  },
  long_shots: {
    type: Number,
    required: true,
  },
  crossing: {
    type: Number,
    required: true,
  },
  finishing: {
    type: Number,
    required: true,
  },
  heading_accuracy: {
    type: Number,
    required: true,
  },
  short_passing: {
    type: Number,
    required: true,
  },
  volleys: {
    type: Number,
    required: true,
  },
  dribbling: {
    type: Number,
    required: true,
  },
  curve: {
    type: Number,
    required: true,
  },
  freekick_accuracy: {
    type: Number,
    required: true,
  },
  long_passing: {
    type: Number,
    required: true,
  },
  ball_control: {
    type: Number,
    required: true,
  },
  acceleration: {
    type: Number,
    required: true,
  },
  sprint_speed: {
    type: Number,
    required: true,
  },
  agility: {
    type: Number,
    required: true,
  },
  reactions: {
    type: Number,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
  shot_power: {
    type: Number,
    required: true,
  },
  jumping: {
    type: Number,
    required: true,
  },
  stamina: {
    type: Number,
    required: true,
  },
  strength: {
    type: Number,
    required: true,
  },
  aggression: {
    type: Number,
    required: true,
  },
  interceptions: {
    type: Number,
    required: true,
  },
  positioning: {
    type: Number,
    required: true,
  },
  vision: {
    type: Number,
    required: true,
  },
  penalties: {
    type: Number,
    required: true,
  },
  composure: {
    type: Number,
    required: true,
  },
  marking: {
    type: Number,
    required: true,
  },
  standing_tackle: {
    type: Number,
    required: true,
  },
  sliding_tackle: {
    type: Number,
    required: true,
  },
  work_rate: {
    type: String,
    required: true,
  },
  weak_foot: {
    type: Number,
    required: true,
  },
  skill_moves: {
    type: Number,
    required: true,
  },
  international_reputation: {
    type: Number,
    required: true,
  },
  best_position: {
    type: String,
    required: true,
  },
  value_in_million: {
    type: Number,
    required: true,
  },
  release_clause_in_million: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const Player = mongoose.model('Player', playerSchema);
export default Player;
