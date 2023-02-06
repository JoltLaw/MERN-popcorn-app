import classes from "./ConfigureNewGame.module.css";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { GamesContextData } from "../../context/gamesContext";

const ConfigureNewGame = () => {
  const [playerList, setPlayerList] = useState([]);
  const [nameInput, setNameInput] = useState("");
  const [penalty, setPanalty] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const gamesContext = useContext(GamesContextData);
  const navigate = useNavigate();

  const updateNameInput = (event) => {
    setNameInput(event.target.value);
  };

  const updatePenalty = (event) => {
    setPanalty(+event.target.value);
  };

  const updateAttempts = (event) => {
    setAttempts(+event.target.value);
  };

  const addPlayer = (event) => {
    event.preventDefault();
    if (nameInput === "") {
      alert("Please enter a name into the input field");
      return;
    }
    setPlayerList((prevState) => [...prevState, nameInput]);
    setNameInput("");
  };

  const AddGame = (event) => {
    event.preventDefault();

    if (playerList.length === 0) {
      alert("Please Add players to the game");
      return;
    }

    const gameObject = {
      Players: playerList,
      attempts: [],
      numberOfAllowedAttempts: attempts,
      penalty,
    };

    fetch("http://localhost:4000/games", {
      method: "POST",
      body: JSON.stringify(gameObject),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        gameObject._id = data._id;
      });

    gamesContext.push(gameObject);

    const gameIndex = gamesContext.length === 0 ? 0 : gamesContext.length - 1;

    navigate(`/game/${gameIndex}`);
  };

  return (
    <div className="wrapper">
      <form onSubmit={AddGame} className={classes.NewGameForm}>
        <div className={classes.gameSettingsContainer}>
          <h3>Add new player:</h3>
          <label htmlFor="playerName">Name</label>
          <input
            name="playerName"
            type="text"
            onChange={updateNameInput}
            value={nameInput}
          />
          <button onClick={addPlayer}>Add+</button>
          <ul className={classes.playerList}>
            {playerList.map((name, index) => {
              return (
                <li key={`Player:${index}`}>
                  <span>{name}</span>
                </li>
              );
            })}
          </ul>
        </div>
        <div className={classes.gameSettingsContainer}>
          <h3>Game Settings</h3>
          <label htmlFor="penalty">Burnt Penalty</label>
          <input
            name="penalty"
            type="number"
            min={0}
            value={penalty}
            onChange={updatePenalty}
          />
          <label htmlFor="attempts">Number of Attempts</label>
          <input
            name="attempts"
            type="number"
            min={0}
            value={attempts}
            onChange={updateAttempts}
          />
        </div>
        <Link to="/" className={classes.homeBtn}>
          Home
        </Link>
        <button type="submit" style={{ gridColumn: "1 / -1" }}>
          Start
        </button>
      </form>
    </div>
  );
};

export default ConfigureNewGame;
