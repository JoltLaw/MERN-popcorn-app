import classes from "./AddScoreForm.module.css";
import { useState, useContext, useEffect } from "react";
import { GamesContextData } from "../../context/gamesContext";
import { useParams } from "react-router";

const AddScoreForm = (props) => {
  const [playerName, setPlayerName] = useState("");
  const [remainingKernels, setRemaingKernerls] = useState(0);
  const [playerList, setPlayerList] = useState();
  const [burntKernels, setBurntKernerls] = useState(0);
  const gameCtx = useContext(GamesContextData);
  const routeParams = useParams();
  const penalty = gameCtx[routeParams.id].penalty;

  const updatePlayer = (event) => {
    setPlayerName(event.target.value);
  };

  const updateRemainingKernels = (event) => {
    setRemaingKernerls(event.target.value);
  };

  const updateBurntKernels = (event) => {
    setBurntKernerls(event.target.value);
  };

  const addScore = (event) => {
    event.preventDefault();

    const attemptObject = {
      name: playerName,
      remainingKernels,
      burntKernels,
      score: remainingKernels + burntKernels * penalty,
    };

    fetch(`http://localhost:4000/games?gameId=${gameCtx[routeParams.id]._id}`, {
      method: "PATCH",
      body: JSON.stringify(attemptObject),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    gameCtx[routeParams.id].attempts.push(attemptObject);

    props.onSubmit();
  };

  useEffect(() => {
    const list = gameCtx[routeParams.id].Players.map((player, index) => {
      const playerAttempts = gameCtx[routeParams.id].attempts.filter(
        (attempt) => {
          if (attempt.name === player) {
            return true;
          } else {
            return false;
          }
        }
      );

      const playerHasNoAttemptsLeft =
        +playerAttempts.length + 1 >
        +gameCtx[routeParams.id].numberOfAllowedAttempts;

      return (
        <option value={player} key={index} disabled={playerHasNoAttemptsLeft}>
          {player}
        </option>
      );
    });
    setPlayerList(list);
  }, [gameCtx, routeParams]);

  return (
    <div className={classes.container}>
      <form className={classes.form} onSubmit={addScore}>
        <div>
          <label>Player </label>
          <select onChange={updatePlayer} value={playerName} required={true}>
            <option value="">None</option>
            {playerList}
          </select>
        </div>
        <div>
          <label>Remaining Kernels </label>
          <input
            type="number"
            min={0}
            onChange={updateRemainingKernels}
            value={remainingKernels}
          />
        </div>
        <div>
          <label>Burnt Kernels </label>
          <input
            type="number"
            min={0}
            onChange={updateBurntKernels}
            value={burntKernels}
          />
        </div>
        <button type="submit">+Add</button>
      </form>
    </div>
  );
};

export default AddScoreForm;
