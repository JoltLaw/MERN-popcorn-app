import { createContext, useEffect, useState } from "react";

export const GamesContextData = createContext({});

export const GamesContext = (props) => {
  const [gamesList, setGamesList] = useState();
  useEffect(() => {
    fetch("http://localhost:4000/games")
      .then((res) => res.json())
      .then((res) => {
        setGamesList(res);
      });
  }, []);

  return (
    <GamesContextData.Provider value={gamesList}>
      {props.children}
    </GamesContextData.Provider>
  );
};
