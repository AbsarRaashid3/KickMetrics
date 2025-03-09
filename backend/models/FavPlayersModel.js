import mongoose from 'mongoose';
const favPlayersSchema = new mongoose.Schema(
    {
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  playerId: {
    type: Number,
    required: true
  }
},
{
    timestamps: true
  }
);

const FavPlayers = mongoose.model('FavPlayers', favPlayersSchema);
export default FavPlayers;
