import React, { useEffect, useState } from "react";
import GameContext, { useGameDispatch, useGameState } from './GameContext';
import { initialState, reducer } from "./state";

const getLetterFrequencies = (word) => {
    const letterFrequencies = word
        .split("")
        .reduce((prev, curr) => {
            if (prev[curr]) {
                prev[curr] += 1;
            } else {
                prev[curr] = 1;
            }

            return prev;
        }, {});

    return letterFrequencies;
}

export const GameRecap = ({isOpen}) => {
    const [show, setShow] = useState(isOpen);
    const { answer, currentRound } = useGameState();

    const handleClose = (e) => {
        if (e.type === "click") {
            setShow(false);
        }
    };

    return (
        <div className={`modal-container modal-${show}`}>
            <div className="modal-overlay"></div>
            <div className={`modal`}>
                <button className="close-btn" onClick={handleClose} onKeypress={handleClose}>x</button>
                <p>
                    You guessed the word {answer} in {currentRound + 1} tries. Congrats!
                </p>
            </div>
        </div>
    );
}

export const RestartGameButton = () => {
    const { dispatch } = useGameDispatch();
    
    const handleClick = (e) => {
        dispatch({ type: 'RESTART'});
    }

    return (
        <div className="restart-btn-container">
            <button className="btn" onClick={handleClick}>
                Restart
            </button>
        </div>
    );
}

export const Game = () => {
    const { status, rounds, currentRound, letterColors, answer, previousGuess } = useGameState();
    const { guess } = rounds[currentRound];
    const { dispatch } = useGameDispatch();

    const updateGameboard = () => {
        return;
    }

    const updateKeyboard = () => {
        return;
    };

    const checkGreen = () => {
        for (let i = 0; i < answer.length; i++) {
            if (rounds[currentRound].guess[i] === answer[i]) {
                dispatch({ type: "ADD_LETTER_TO_COLOR_LIST", payload: { color: 'green', letter: rounds[currentRound].guess[i] }});
                dispatch({ type: "ADD_LETTER_BY_COLOR", payload: { color: 'green', data: { letter: rounds[currentRound].guess[i], spot: i }}});
                dispatch({ type: "ADD_LETTER_BY_SPOT", payload: { spot: i, data: { letter: rounds[currentRound].guess[i], color: 'green' }}});
            }
        }
    }
    
    const checkYellow = () => {
        const guess = rounds[currentRound].guess;
        const answerLetterFrequencies = getLetterFrequencies(answer);
        const greenLetterFrequencies = getLetterFrequencies(rounds[currentRound].score.byColor.green.map(r => r.letter).join(""));
    
        for (let i = 0; i < answer.length; i++) {
            for (let j = 0; j < answer.length; j++) {
                const letterGreenCount = greenLetterFrequencies[guess[i]] || 0;
    
                if (
                    rounds[currentRound].score.byColor.green.length
                    && rounds[currentRound].score.byColor.green.map(r => r.spot).includes(i)
                ) {
                    continue;
                } else if (
                    (guess[i] === answer[j])
                    && (answerLetterFrequencies[guess[i]] - letterGreenCount > 0)
                ) {
                    dispatch({ type: "ADD_LETTER_TO_COLOR_LIST", payload: { color: 'yellow', letter: rounds[currentRound].guess[i] }});
                    dispatch({ type: "ADD_LETTER_BY_COLOR", payload: { color: 'yellow', data: { letter: rounds[currentRound].guess[i], spot: i }}});
                    dispatch({ type: "ADD_LETTER_BY_SPOT", payload: { spot: i, data: { letter: rounds[currentRound].guess[i], color: 'yellow' }}});
    
                    answerLetterFrequencies[guess[i]] -= 1;
                    break;
                }
            }
        }
    };
    
    const checkGrey = () => {
        const yellows = rounds[currentRound].score.byColor.yellow
            .map(letterData => letterData.spot);
        const greens = rounds[currentRound].score.byColor.green
            .map(letterData => letterData.spot);
        const greySpots = [0,1,2,3,4]
            .filter(i => !yellows.includes(i))
            .filter(i => !greens.includes(i));
    
        greySpots.forEach(i => {
            dispatch({ type: "ADD_LETTER_TO_COLOR_LIST", payload: { color: 'grey', letter: rounds[currentRound].guess[i] }});
            dispatch({ type: "ADD_LETTER_BY_COLOR", payload: { color: 'grey', data: { letter: rounds[currentRound].guess[i], spot: i }}});
            dispatch({ type: "ADD_LETTER_BY_SPOT", payload: { spot: i, data: { letter: rounds[currentRound].guess[i], color: 'grey' }}});
        })
    };

    const updateYellows = () => {
        if (rounds[currentRound].score.byColor.yellow.length) {
            return;
        }
        rounds[currentRound].score.byColor.yellow.forEach(spot => {
            if (letterColors[spot.letter] === 'green') {
                return;
            }
            dispatch({ type: 'ADD_COLOR_TO_LETTER', payload: { letter: spot.letter, color: 'yellow'}})
            // letterColors[spot.letter] = 'yellow';
    
        });
    }
    
    const updateGreys = () => {
        if (!rounds[currentRound].score.byColor.grey.length === 0) {
            return;
        }
    
        rounds[currentRound].score.byColor.grey.forEach(spot => {
            if (letterColors[spot.letter] === 'green' || letterColors[spot.letter] === 'yellow') {
                return;
            }

            dispatch({ type: 'ADD_COLOR_TO_LETTER', payload: { letter: spot.letter, color: 'grey'}})
            // game.letterColors[spot.letter] = 'grey';
        });
    }
    
    const updateGreens = () => {
        if (rounds[currentRound].score.byColor.green.length === 0) {
            return;
        }

        rounds[currentRound].score.byColor.green.forEach((spot, i) => {
            dispatch({ type: 'ADD_COLOR_TO_LETTER', payload: { letter: spot.letter, color: 'green'}})
            //game.letterColors[spot.letter] = 'green';
        });
    }

    const updateLetterColors = () => {
        updateGreens();
        updateYellows();
        updateGreys();
    }
    

    const formatRow = (round) => {
        return round.score.bySpot;
    };

    const updateBoard = (currentRound, rounds) => {
        for (let r = 0; r <= currentRound; r++) {
            dispatch({ type: "ADD_BOARD_ROW", payload: formatRow(rounds[r]) })
        }
    };

    const checkGuess = () => {
        checkGreen();
        checkYellow();
        checkGrey();
        updateLetterColors();
        updateGameboard();
        updateKeyboard();
    };

    const updateGame = (guess) => {
        dispatch({ type: "UPDATE_PREVIOUS_GUESS", payload: guess });
    }

    const processGuess = (guess) => {
        // Validate guess
        checkGuess(guess);
        updateGame(guess);
    }

    const handleSubmitGuess = async (e) => {
        console.log(e);
        dispatch({ type: 'ADD_USER_GUESS', payload: guess.toLowerCase() });
        processGuess(guess);
        updateBoard();
    };

    const handleKeyPress = (e) => {
        console.log(e);
        return;
    };

    useEffect(() => {
        // if status is new
        // send dispatch to set answer, set status to ON and round to 1

    }, [currentRound, dispatch, status]);

    useEffect(() => {
        const isGameOver = () => {
            if (currentRound === answer.length - 1) {
                return true;
            }
        
            if (isGuessed(previousGuess)) {
                return true;
            }
        
            return false;
        }
        
        const isGuessed = (guess) => {
            return (guess && guess === answer);
        }

        if (status === 'NEW') {
            dispatch({ type: 'RESTART' });
        }

        if (!isGameOver(isGuessed)) {
            dispatch({ type: 'INCREMENT_ROUND' });
        }

        dispatch({ type: 'GAME_ENDED' });
    }, [status, currentRound, answer, dispatch, previousGuess])

    return (
        <div className="game">
            {(status === 'GAME_ENDED') && (
                <>
                    <GameRecap isOpen={true} />
                    <RestartGameButton />
                </>
            )}
            <Gameboard />
            <Keyboard handleKeyPress={handleKeyPress} handleSubmit={handleSubmitGuess} />
        </div>
    )
};

export const Gameboard = () => {
    const { currentRound, answer } = useGameState();

    const CurrentBoard = () => {
        const { board } = useGameState();
        return (
            <>
            {board.map((row,i) => {
                return (
                    <div className="guess-row" id={`row-${i}`}>
                        {Object.values(row).map(({ letter, color, s }) => {
                            return (
                                <div className={`spot spot-${color}`} id={`round-${i}-spot-${s}`} data-letter="letter">
                                    {letter}
                                </div>
                            );
                        })}
                    </div>
                );
            })}
            </>
        );
    };

    const RestOfBoard = () => {
        let rows = []
    
        for (let i = 0; i < answer.length - (currentRound + 1); i++) {
            rows.push(
                <div className="guess-row" id={`row-${i}`}>
                    {Array.from(5).map(s => {
                        return (<div className="spot spot-empty" id={`round-${i}-spot-${s}`}></div>);
                    })}
                </div>
            );
        }

        return (
            <>
                {rows.map(row => {
                    return row;
                })}
            </>
        );
    };

    return (
        <div className="game-board">
            <CurrentBoard />
            <RestOfBoard />
        </div>
    );
};

const keyBoardRows = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["enter", "z", "x", "c", "v", "b", "n", "m", "del"],
]

export const Keyboard = ({ handleKeyPress, handleSubmit }) => {
    return (
        <div className="keyboard">
            {keyBoardRows.map((row) => {
                return (
                    <div className="keyboard-row">
                        {row.map(char => {
                            if (char === "enter") {
                                return (
                                    <div className="key" id="key-enter">
                                        <button name="enter-key" onClick={handleSubmit} onKeyPress={handleKeyPress}>
                                            {char}
                                        </button>
                                    </div>
                                );
                            }

                            if (char === "del") {
                                return (
                                    <div className="key" id={`key-${char}`}>
                                            <button name={`${char}-key`} value={`${char}`} onClick={handleKeyPress} onKeyPress={handleKeyPress}>
                                                {char}
                                            </button>
                                    </div>
                                );
                            }

                            return (
                                <div className="key" id={`key-${char}`}>
                                    <button name={`${char}-key`} value={`${char}`} onClick={handleKeyPress} onKeyPress={handleKeyPress}>
                                        {char}
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                )
            })}

        </div>
    );
};

const Wordleaux = () => {
    // const { status } = useGameState();
    // console.log(status);
    return (
        <div>
            hi
        </div>
    );
}

export default Wordleaux;
