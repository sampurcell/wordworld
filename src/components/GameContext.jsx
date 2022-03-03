// import React, { useReducer, useContext, createContext } from "react";
// import { initialState } from "../state";

// export const GameStateContext = createContext('game');
// // export const GameDispatch = createContext({});

// // export const useGameState = () => useContext(GameState);
// export const useGameState = () => {}
// // export const useGameDispatch = () => useContext(GameDispatch);
// export const useGameDispatch = () => {};

// export const GameContext = ({
//   // reducer,
//   // initialState,
//   children,
//  }) => {
//   // const [state, dispatch] = useReducer(reducer, initialState);

//   return (
//       <GameStateContext.Provider value={initialState}>
//         {/* <GameDispatch.Provider value={dispatch}> */}
//           {children}
//         {/* </GameDispatch.Provider> */}
//       </GameStateContext.Provider>
//   );
// }

import React, { useReducer, useContext, useEffect } from "react";
// import useInterval from "./useInterval";

const GameState = React.createContext();
const GameDispatch = React.createContext();

export const useGameState = () => useContext(GameState);
export const useGameDispatch = () => useContext(GameDispatch);

export default function GameContext({ reducer, initialState, children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GameState.Provider value={state}>
      <GameDispatch.Provider
        value={dispatch}
      >
        {children}
      </GameDispatch.Provider>
    </GameState.Provider>
  );
}
