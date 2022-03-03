import React, { useEffect, useState } from 'react';

//   BrowserRouter,
//   Routes,
//   Route,
//   Link,
// } from 'react-router-dom';
// // import logo from './logo.svg';
// import './App.css';
// import Home from './Home';
// import Wordleaux from './Wordleaux';

// const Header = () => {
//   return (
//     <header className="App-header">
//       <Link
//         to="/"
//         className="App-link"
//       >
//         Home
//       </Link>
//     </header>
//   );
// };

// function App () {
//   return (
//     <div className="App">
//       {/* <BrowserRouter> */}
//         {/* <Header />
//         <Routes>
//             <Route exact path="/">
//                 <Home />
//             </Route>
//             <Route path="/wordleaux">
            
//             </Route>
//         </Routes> */}
//       {/* </BrowserRouter> */}
//       <Wordleaux />
//     </div>
//   );
// };

// export default App;


import "../App.css";
import GameContext, { useGameState, useGameDispatch } from "./GameContext";
import { initialState, reducer } from "../state";
import { GAME_WORDS } from "../lists/words";
import { keyboard } from '@testing-library/user-event/dist/keyboard';
const PREVENTED_KEYS = ['altKey', 'metaKey', 'ctrlKey'];
// import { GameRecap, RestartGameButton } from '../Wordleaux';
// import Gameboard from './Gameboard';
// import { Keyboard } from './Keyboard';

const times = (length, fn) => Array.from({ length }, (_, i) => fn(i));

// const CurrentBoard = ({board}) => {
//   const initialSpots = Array.from(5)
//   return (
//       <>
//       {board.rows.map((row,i) => {
//           return (
//             <>
//               <div className="row" id={`row-${i}`}>
//                   {Object.values(row).map(({ letter, color, s }) => {
//                       return (
//                           <div
//                             className={`spot spot-${color}`}
//                             id={`round-${i}-spot-${s}`}
//                             data-letter="letter"
//                             key={`round-${i}-spot-${s}`}
//                           >
//                             <input value={letter} type="text" />
//                           </div>
//                       );
//                   })}
//               </div>
//           </>
//           );
//       })}
//       <div className="guess-row guess-row--active" id={`row-${board.length}`}>
//           {times(5, s => (
//             <div
//               className={`spot spot-empty`}
//               id={`round-${board.length}-spot-${s}`}
//               data-letter="letter"
//               key={`round-${board.length}-spot-${s}`}
//             >
//               <input value={''} type="text" />
//             </div>
//           ))}; 
//       </div>
//       </>
//   );
// };

// const renderRowHTML = (rowIndex) => (
//   <div className="guess-row" id={`row-${rowIndex}`}>
//     {times(5, s => (
//       <div
//         className="spot spot-empty"
//         id={`round-${rowIndex}-spot-${s}`}
//         key={`round-${rowIndex}-spot-${s}`}
//       >
//         <p>&nbsp;</p>
//       </div>
//     ))}
//   </div>
// );
export const Toaster = ({
  name = "unnamed",
}) => {
  const { toasterMessage, toasterDuration } = useGameState();
  const dispatch = useGameDispatch();

  useEffect(() => {
    if (toasterDuration > 0) {
      window.setTimeout(() => {
        dispatch({ type: "ADD_TOASTER_STATE", payload:  { message: "", duration: 0 }})
      }, toasterDuration);
    }
  }, [toasterMessage, toasterDuration, dispatch]);

  return (
    <div className={!!toasterMessage ? "show" : "hide"} id={`${name}-toaster`}>{toasterMessage}</div>
  );
}

const GAME_OVER_MESSAGES = {
  1: ['u "won", Chester McCheaterface'],
  2: ["I see you playa"],
  3: ["U almost don't suck"],
  5: ["rly?"],
  4: ["U estúpido"],
  6: ["Straight badussy"],
  loser: ["Soy Boy Loser"],
}

export const Gameboard = () => {
  const { board } = useGameState();

  return (
      <div id="board-container">
        <div id="board">
          {board.rows.map((row,i) => {
              return (
                  <div key={`row-${i}`} data-state={row.state} data-letters={row.letters} className="row" id={`row-${i}`}>
                      {row.tiles.map((tile, s) => {
                          return (
                              <div key={`${tile.number}-${i}`} className={`tile`} data-state={tile.state} data-animation={tile.animation} id={`round-${i}-spot-${s}`} data-letter={tile.letter}>
                                  {tile.letter || ""}
                              </div>
                          );
                      })}
                  </div>
              );
          })}
        </div>
      </div>
  );
};

export const Keyboard = ({ handleUserEvent }) => {
  const { keyboard, status } = useGameState();
  const keyboardRows = Object.values(keyboard)
    .reduce((sorted, letter) => {
      if (sorted[letter.row]) {
          sorted[letter.row].push(letter);
      } else {
          sorted[letter.row] = [letter];
      }

      return sorted;
    }, {});

  return (
    <div id="keyboard">
      {Object.values(keyboardRows)
        .map((row, i) => {
          return (
            <div className="keyboard-row" key={`keyboard-row-${i}`}>
              {row.map(({ letter, state, animation}, l) => (
                  <button
                    key={`${letter}-key`}
                    data-key={letter}
                    data-state={state}
                    data-animation={animation}
                    onClick={handleUserEvent}
                    disabled={status === 'ENDED' ? true : false}
                  >
                    {letter === 'Backspace' ? 'del' : letter}
                  </button>
              ))}
            </div>
          );
      })}
    </div>
  );
};

export const getLetterFrequencies = (word) => {
  return word
    .split("")
    .reduce((prev, curr) => {
      if (prev[curr]) {
          prev[curr] += 1;
      } else {
          prev[curr] = 1;
      }

      return prev;
    }, {});
}

const GameRecap = () => {
  const {
    currentRound,
    modalOpen,
    // winStatus,
  } = useGameState();
  const dispatch = useGameDispatch();
  const attempts = currentRound + 1;

  const closeModal = (e) => {
    dispatch({ type: 'UPDATE_MODAL_STATE', payload: false });

    return;
  }

  return (
    <div className={`game-modal ${modalOpen ? 'open' : 'closing hidden'}`}>
      <div className="overlay"></div>
      <div className="content">
        <div className="close-icon icon" onClick={closeModal}>X</div>
        <div className="container">
          <h1>Statistics</h1>
          <div id="guess-distribution">
            <div className="graph-container">
              <div className="guess">1</div>
              <div className="graph">
                <div
                  className="graph-bar"
                  style={{
                    width: '7%',
                    backgroundColor: (attempts === 1) ? 'green' : 'gray'
                  }}
                >
                  <div className="num-guesses">
                    {(attempts === 1) ? 1 : 0}
                  </div>
                </div>
              </div>
            </div>
            <div className="graph-container">
              <div className="guess">2</div>
              <div className="graph">
              <div
                  className="graph-bar"
                  style={{
                    width: '7%',
                    backgroundColor: (attempts === 2) ? 'green' : 'gray'
                  }}
                >
                  <div className="num-guesses">
                    {(attempts === 2) ? 1 : 0}
                  </div>
                </div>
              </div>
            </div>
            <div className="graph-container">
              <div className="guess">3</div>
              <div className="graph">
                <div
                  className="graph-bar"
                  style={{
                    width: '7%',
                    backgroundColor: (attempts === 3) ? 'green' : 'gray'
                  }}
                >
                  <div className="num-guesses">
                    {(attempts === 3) ? 1 : 0}
                  </div>
                </div>
              </div>
            </div>
            <div className="graph-container">
              <div className="guess">4</div>
              <div className="graph">
                <div
                  className="graph-bar"
                  style={{
                    width: '7%',
                    backgroundColor: (attempts ===41) ? 'green' : 'gray'
                  }}
                >
                  <div className="num-guesses">
                    {(attempts === 4) ? 1 : 0}
                  </div>
                </div>
              </div>
            </div>
            <div className="graph-container">
              <div className="guess">5</div>
              <div className="graph">
                <div
                  className="graph-bar"
                  style={{
                    width: '7%',
                    backgroundColor: (attempts === 5) ? 'green' : 'gray'
                  }}
                >
                  <div className="num-guesses">
                    {(attempts === 5) ? 1 : 0}
                  </div>
                </div>
              </div>
            </div>
            <div className="graph-container">
              <div className="guess">6</div>
              <div className="graph">
                <div
                  className="graph-bar"
                  style={{
                    width: '7%',
                    backgroundColor: (attempts === 6) ? 'green' : 'gray'
                  }}
                >
                  <div className="num-guesses">
                    {(attempts === 6) ? 1 : 0}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer">
            <div className="share"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

const Game = () => {
  const {
    modalOpen,
    board,
    answer,
    currentRound,
    gameRounds,
    keyboard,
    toasterMessage,
    toasterDuration,
  } = useGameState();
  const dispatch = useGameDispatch();
  const initialKeyboardEvaluation = {
    0: { letter: "", state: "", animation: "" },
    1: { letter: "", state: "", animation: "" },
    2: { letter: "", state: "", animation: "" },
    3: { letter: "", state: "", animation: "" },
    4: { letter: "", state: "", animation: "" },
  };
  const initialTileEvaluation = {
    0: "tbd",
    1: "tbd",
    2: "tbd",
    3: "tbd",
    4: "tbd",
  };
  let tileEvaluation = initialTileEvaluation;
  let keyboardEvaluation = initialKeyboardEvaluation;

  function setTileEvaluation(value) {
    tileEvaluation = value;
  }

  function evaluateKeyboard() {
    const row = board.rows[currentRound];

    row.letters.split("").forEach((letter,
       i) => {
      keyboardEvaluation[i] = {
        ...keyboardEvaluation[i],
        letter,
      }

      return;
    });
    
    const keyboardKeyDelta = Object.values(keyboardEvaluation)
    const keysToUpdate = keyboardKeyDelta.reduce((keyMap, evaluation, i) => {
    const key = evaluation.letter;
      keyMap[key] = {
        ...keyboard[key],
        state: getLetterState(keyboard[key], tileEvaluation[i]),
      };

      return keyMap;
    }, {});

    keyboardEvaluation = keysToUpdate;
  }

  const updateGameboard = async () => {
    await animateRow(250, 5);
    updateKeyboard();
  };

  async function animateRow(delay, repetitions) {
    let x = 0;
    const intervalID = window.setInterval(() => {
      dispatch({
        type: "UPDATE_TILE_STATE",
        payload: {
          number: x,
          state: tileEvaluation[x],
          animation: 'flip-in',
        },
      });

      if (++x === repetitions) {
        const [isOver, endState] = isGameOver(tileEvaluation);
        if (isOver) {
          endGame(endState);
        } else {
          updateGame()
        }

        window.clearInterval(intervalID);
      }
    }, delay);
  }

  function isGameOver(tileEvaluation) {
    const isWon = Object.values(tileEvaluation)
      .every(tileState => tileState === 'correct');

    if (isWon) {
      return [true, 'WINNER'];
    }

    if (currentRound === gameRounds - 1) {
      return [true, 'LOSER'];
    } else {
      return [false];
    }
  }

  function endGame(winStatus) {
     // Add other statistics including past games here when available from local storage
     let message = getGameOverMessage(winStatus === 'WINNER', currentRound + 1);

     dispatch({ type: "ADD_TOASTER_STATE", payload: { message: message, duration: 10001 }});
     dispatch({ type: "UPDATE_MODAL_STATE", payload: true });
  }

  // Return random message/insult in future.
  function getGameOverMessage(isWinner, attempts) {
    return isWinner
      ? GAME_OVER_MESSAGES[attempts]
      : GAME_OVER_MESSAGES['loser'].first();

  }

  function updateKeyboard() {
    dispatch({ type: 'UPDATE_KEYBOARD', payload: keyboardEvaluation});
  }

  const checkGreen = () => {
    for (let i = 0; i < answer.length; i++) {
      if (board.rows[currentRound].letters[i] === answer[i]) {
        setTileEvaluation({
          ...tileEvaluation,
          [i]: 'correct',
        });
      }
    }
  };
  
  const evaluateRemainingTiles = () => {
    const rowTiles = board.rows[currentRound].tiles;
    const greenTileNumbers = Object.entries(tileEvaluation)
            .filter(([number, state]) => (state === "correct"))
            .map(([number]) => parseInt(number));
    const answerLetters = answer.split("").filter((l, i) => !greenTileNumbers.includes(i));
    const remainingTiles = rowTiles
      .filter(t => !greenTileNumbers.includes(t.number));
    const remainingLetters = remainingTiles
      && remainingTiles.length
        ? remainingTiles.map(t => t.letter)
        : [];

    remainingTiles.forEach((t, i) => {
      const index = answerLetters
        .findIndex(l => l === t.letter);

      if (index !== -1) {
        remainingLetters.splice(index, 1);
        setTileEvaluation({
          ...tileEvaluation,
          [t.number]: 'present',
        });
      } else {
        setTileEvaluation({
          ...tileEvaluation,
          [t.number]: 'absent',
        });
      }
    });

  };

  const checkGuess = async () => {
    checkGreen();
    evaluateRemainingTiles();
    evaluateKeyboard()
    await updateGameboard();

    return;
  };

  function updateGame() {
    dispatch({ type: "UPDATE_GAME" });

    tileEvaluation = initialTileEvaluation;
    keyboardEvaluation = initialKeyboardEvaluation;
  }

  const processGuess = (guess) => {
    const invalid = validateUserGuess(guess);


    if (invalid) {
      dispatch({ type: "ADD_ROW_STATE", payload: "invalid" });
      dispatch({  type: "ADD_TOASTER_STATE", payload: { message: invalid, duration: 5000 }});
      setTimeout(() => dispatch({ type: "ADD_ROW_STATE", payload: "" }), 250);
      return;
    }

    checkGuess(guess);
  };

  function handleUserSubmit () {
    const guess = board.rows[currentRound].letters;

    processGuess(guess);
  }

  const onKeyPress = (e) => {
    const key = e.key;

    if (!Object.keys(initialState.keyboard).includes(key)) {
      return;
    }

    if (PREVENTED_KEYS.some(state => !!e[state])) {
      return;
    }

    if (key === 'Enter') {
      handleUserSubmit();
      return;
    } else if (key === 'Backspace') {
      dispatch({ type: 'REMOVE_LETTER_FROM_TILE'});
      return;
    } else {
      dispatch({ type: 'ADD_LETTER_TO_TILE', payload: { letter: key }});
      return;
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", onKeyPress);

    // Remove event listeners on cleanup. See useEffect docs for more info.
    return () => {
      window.removeEventListener("keydown", onKeyPress);
    };
  });

  function handleUserEvent(e) {
    e.preventDefault();
    const key = e.target.dataset.key;


    if (!Object.keys(initialState.keyboard).includes(key)) {
      return;
    }

    if (key === 'Enter') {
      handleUserSubmit();
      return;
    } else if (key === 'Backspace') {
      dispatch({ type: 'REMOVE_LETTER_FROM_TILE' });
      return;
    } else {
      dispatch({ type: 'ADD_LETTER_TO_TILE', payload: { letter: key }});
      return;
    }
  }

  return (
    <div id="game">
      <GameRecap isOpen={modalOpen} />
      {/* <RestartGameButton /> */}
      <div className="toaster" id="game-toaster">
        <Toaster name="game" message={toasterMessage} duration={toasterDuration}/>
      </div>
      <Gameboard />
      <Keyboard handleUserEvent={handleUserEvent} />
    </div>
  );
};

const Header = () => {
  return (
    <header className='App-header'>
      <p>React Game</p>
      <p>Score: (TBD)</p>
      <button>Play</button>
    </header>
  );
};

function validateUserGuess(guess) {
  let validationMessage = "U done messed up";

  // @TODO update the valid length to come from state.
  if (!isCorrectLength(guess.length, 5)) {
    validationMessage = `5 letters, numbnuts`;

    return validationMessage;
  }

  // In the accepted words list
  if (!isValidWord(guess)) {
    validationMessage = 'Use real words dumbdumb';

    return validationMessage;
  }

  return false;
}

function isCorrectLength(guessLength, validLength) {
  if (guessLength !== validLength) {
    return false;
  }

  return true;
}

function getLetterState(keyboardLetterData, newEvaluation) {
  if (newEvaluation === 'correct') {
    return newEvaluation;
  }
  
  if (newEvaluation === 'present') {
    return (keyboardLetterData.state !== 'correct') ? newEvaluation : 'correct';
  }


  return (keyboardLetterData.state === 'correct' || keyboardLetterData.state === 'present')
    ? keyboardLetterData.state
    : newEvaluation;
}

function isValidWord(guess) {
  return GAME_WORDS.VALID.includes(guess);
}


const Wordleaux = () => {
  return (<Game />);
};

function App() {
  return (
    <GameContext initialState={initialState} reducer={reducer}>
      <Header />
      <main className='main'>
          <Wordleaux />
      </main>
    </GameContext>
  );
}

export default App;
