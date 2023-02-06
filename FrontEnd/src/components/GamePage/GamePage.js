import classes from "./GamePage.module.css";
import { Link, useParams } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import Modal from "../UI/Modal";
import AddScoreForm from "./AddScoreForm";
import { GamesContextData } from "../../context/gamesContext";

const GamePage = () => {
  const gameCtx = useContext(GamesContextData);
  const routeParams = useParams();
  const [gameId, setGameId] = useState(+routeParams.id);
  const [updateScore, setUpdateScore] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const attemptsFunction = () => {
    if (gameCtx[gameId].attempts === undefined) {
      return <></>;
    }
    gameCtx[gameId].attempts.map((attempt, index) => {
      return (
        <li key={index}>
          <strong>{attempt.name}</strong>
          <strong>{attempt.score}</strong>
        </li>
      );
    });
  };
  const [scoreBoard, setScoreBoard] = useState(attemptsFunction);

  const sortScores = (a, b) => {
    const scoreA = a.score;
    const scoreB = b.score;
    let comparison = 0;
    if (scoreA > scoreB) {
      comparison++;
    }
    if (scoreA < scoreB) {
      comparison--;
    }
    return comparison;
  };

  useEffect(() => {
    setScoreBoard(
      gameCtx[routeParams.id].attempts
        .sort(sortScores)
        .map((attempt, index) => {
          return (
            <li className={classes.NameScoreContainer} key={index}>
              <strong>{attempt.name}</strong>
              <strong>{attempt.score}</strong>
            </li>
          );
        })
    );
    setUpdateScore(false);
  }, [gameCtx, routeParams, updateScore]);

  const addNewScore = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const updateScoreBoard = (props) => {
    setModalOpen(false);
    setUpdateScore(true);
  };

  return (
    <div className="wrapper">
      {modalOpen && (
        <Modal onClick={closeModal}>
          <AddScoreForm onSubmit={updateScoreBoard} />
        </Modal>
      )}
      <div className={classes.scoreBoardContainer}>
        <div>
          <h2>Score Board</h2>

          <ul className={classes.scoreList}>
            <div className={classes.NameScoreContainer}>
              <span>Name</span> <span>Score</span>
            </div>
            {scoreBoard}
          </ul>
        </div>
        <div className={classes.controls}>
          <Link to="/">Home</Link>
          <button onClick={addNewScore}>Add New Score</button>
        </div>
      </div>
    </div>
  );
};

export default GamePage;
