import React, { useReducer, useContext } from "react";

const GameState = React.createContext();
const GameDispatch = React.createContext();

export const useGameState = () => useContext(GameState);
export const useGameDispatch = () => useContext(GameDispatch);

export default function GameContext({ reducer, initialState, children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GameState.Provider value={state}>
      <GameDispatch.Provider value={dispatch}>
        {children}
      </GameDispatch.Provider>
    </GameState.Provider>
  );
}
