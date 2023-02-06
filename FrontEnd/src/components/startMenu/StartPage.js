import classes from "./StartPage.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import Modal from "../UI/Modal";

const StartPage = () => {
  const [showRules, setShowRules] = useState(false);

  const showHowToPlay = (event) => {
    setShowRules(true);
  };

  const hideHowToPlay = (event) => {
    setShowRules(false);
  };

  return (
    <div className="wrapper">
      {showRules && (
        <Modal onClick={hideHowToPlay}>
          <div className={classes.rulesPage}>
            <h2>How to play!</h2>
            <p>
              Popcorn Kernels is a game about trying to have the least amount of
              popcorn kernerls left.
            </p>

            <p>
              When starting a new game you can set the amount of attempts playes
              get, and the penalty for burning any of the popcorn in the bag.
            </p>

            <p>
              Once everyone has used all their attempts to person with the
              lowest score wins.
            </p>
          </div>
        </Modal>
      )}
      <div className={classes.door}>
        <div className={classes.doorWindow}></div>
      </div>
      <div className={classes.gameOptionsContainer}>
        <h1 className={classes.title}>Popcorn Kernels</h1>
        <Link to="/newGame">
          <button className={classes.Option}>New Game</button>
        </Link>
        <Link to="/loadGame">
          <button className={classes.Option}>Load</button>
        </Link>
        <button className={classes.Option} onClick={showHowToPlay}>
          How to play
        </button>
      </div>
    </div>
  );
};

export default StartPage;
