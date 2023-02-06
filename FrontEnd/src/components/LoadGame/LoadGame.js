import classes from "./LoadGame.module.css";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GamesContextData } from "../../context/gamesContext";

const LoadGame = () => {
  const gameCtx = useContext(GamesContextData);
  const loadSelectedGame = (gameId) => {
    navigate(`/game/${gameId}`);
  };

  const renderGames = (gameId) => {
    let list;
    if (gameCtx.length === 0) {
      list = (
        <div
          style={{
            backgroundColor: "#fff",
            padding: "10px",
            borderRadius: "12px",
            textAlign: "center",
          }}
        >
          <h2>No Games Found!</h2>
          <Link to="/newGame">Start a Game</Link>
        </div>
      );
    } else {
      list = gameCtx.map((game, index) => {
        return (
          <li key={`game${index}`} className={classes.loadOption}>
            <h1>Game: {index + 1}</h1>
            <button onClick={loadSelectedGame.bind(null, index)}>Load</button>
            <button onClick={dropSelectedGame.bind(null, index)}>Delete</button>
          </li>
        );
      });
    }

    return list;
  };

  const dropSelectedGame = (index) => {
    fetch(`http://localhost:4000/games?id=${gameCtx[index]._id}`, {
      method: "DELETE",
    });
    gameCtx.splice(index, 1);
    setGamesList(renderGames);
  };
  const [gamesList, setGamesList] = useState(renderGames);
  const navigate = useNavigate();

  return (
    <div className="wrapper">
      <div className={classes.container}>
        <ul className={classes.loadOptionList}>{gamesList}</ul>
        <Link to="/">Home</Link>
      </div>
    </div>
  );
};

export default LoadGame;
