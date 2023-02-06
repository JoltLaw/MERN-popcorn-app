const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  Players: [{ type: String }],
  attempts: [],
  numberOfAllowedAttempts: { type: Number },
  penalty: { type: Number },
});

const game = mongoose.model("game", gameSchema);

module.exports = game;
