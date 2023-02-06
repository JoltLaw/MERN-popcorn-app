import "./App.css";
import { Routes, Route } from "react-router";
import StartPage from "./components/startMenu/StartPage";
import ConfigureNewGame from "./components/NewGame/ConfigureNewGame";
import GamePage from "./components/GamePage/GamePage";
import LoadGame from "./components/LoadGame/LoadGame";
import { GamesContext } from "./context/gamesContext";

function App() {
  return (
    <GamesContext>
      <Routes>
        <Route path="/loadGame" element={<LoadGame />} />
        <Route path="/game/:id" element={<GamePage />} />
        <Route path="/newGame" element={<ConfigureNewGame />} />
        <Route path="*" element={<StartPage />} />
      </Routes>
    </GamesContext>
  );
}

export default App;
