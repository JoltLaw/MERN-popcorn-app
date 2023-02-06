const express = require("express");
const game = require("../models/game");

const router = new express.Router();

// Lets a user start a new game
router.post("/games", async (req, res) => {
  const Game = new game({ ...req.body });

  try {
    await Game.save();
    res.status(201).send(Game);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Lets a user load a previous game
router.get("/games", async (req, res) => {
  try {
    const games = await game.find({});
    res.status(200).send(games);
  } catch {
    res.status(500).send("Unable to find any games.");
  }
});

// Lets a user post an attempt to the data base
router.patch("/games", async (req, res) => {
  const gameId = req.query.gameId;
  const attempt = req.body;
  try {
    const Game = await game.findOne({ _id: gameId });
    Game.attempts.push(attempt);
    Game.save();
    res.status(200).send(Game);
  } catch {
    res.status(400).send("Unable to save data");
  }
});

router.delete("/games", async (req, res) => {
  const gameId = req.query.id;
  try {
    const deletedItem = await game.findOneAndDelete({ _id: gameId });
    res.status(200).send(deletedItem);
  } catch {
    res.status(400).send("Unable to find game");
  }
});

module.exports = router;
