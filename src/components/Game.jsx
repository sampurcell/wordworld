import React, { useEffect } from 'react';
import { useGameDispatch, useGameState } from './GameContext';
import { GameRecap, RestartGameButton } from '../Wordleaux';
import Gameboard from './Gameboard';
import { Keyboard } from './Keyboard';

export const getLetterFrequencies = (word) => {
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

const Game = () => {
    const {
        status,
        rounds,
        currentRound,
        letterColors,
        answer,
        previousGuess
    } = useGameState();
    // const { guess } = rounds[currentRound];
    const { dispatch } = useGameDispatch();
    console.log(useGameDispatch);

    // const updateGameboard = () => {
    //     return;
    // }

    // const updateKeyboard = () => {
    //     return;
    // };

    // const checkGreen = () => {
    //     for (let i = 0; i < answer.length; i++) {
    //         if (rounds[currentRound].guess[i] === answer[i]) {
    //             dispatch({ type: "ADD_LETTER_TO_COLOR_LIST", payload: { color: 'green', letter: rounds[currentRound].guess[i] }});
    //             dispatch({ type: "ADD_LETTER_BY_COLOR", payload: { color: 'green', data: { letter: rounds[currentRound].guess[i], spot: i }}});
    //             dispatch({ type: "ADD_LETTER_BY_SPOT", payload: { spot: i, data: { letter: rounds[currentRound].guess[i], color: 'green' }}});
    //         }
    //     }
    // }
    
    // const checkYellow = () => {
    //     const guess = rounds[currentRound].guess;
    //     const answerLetterFrequencies = getLetterFrequencies(answer);
    //     const greenLetterFrequencies = getLetterFrequencies(rounds[currentRound].score.byColor.green.map(r => r.letter).join(""));
    
    //     for (let i = 0; i < answer.length; i++) {
    //         for (let j = 0; j < answer.length; j++) {
    //             const letterGreenCount = greenLetterFrequencies[guess[i]] || 0;
    
    //             if (
    //                 rounds[currentRound].score.byColor.green.length
    //                 && rounds[currentRound].score.byColor.green.map(r => r.spot).includes(i)
    //             ) {
    //                 continue;
    //             } else if (
    //                 (guess[i] === answer[j])
    //                 && (answerLetterFrequencies[guess[i]] - letterGreenCount > 0)
    //             ) {
    //                 dispatch({ type: "ADD_LETTER_TO_COLOR_LIST", payload: { color: 'yellow', letter: rounds[currentRound].guess[i] }});
    //                 dispatch({ type: "ADD_LETTER_BY_COLOR", payload: { color: 'yellow', data: { letter: rounds[currentRound].guess[i], spot: i }}});
    //                 dispatch({ type: "ADD_LETTER_BY_SPOT", payload: { spot: i, data: { letter: rounds[currentRound].guess[i], color: 'yellow' }}});
    
    //                 answerLetterFrequencies[guess[i]] -= 1;
    //                 break;
    //             }
    //         }
    //     }
    // };
    
    // const checkGrey = () => {
    //     const yellows = rounds[currentRound].score.byColor.yellow
    //         .map(letterData => letterData.spot);
    //     const greens = rounds[currentRound].score.byColor.green
    //         .map(letterData => letterData.spot);
    //     const greySpots = [0,1,2,3,4]
    //         .filter(i => !yellows.includes(i))
    //         .filter(i => !greens.includes(i));
    
    //     greySpots.forEach(i => {
    //         dispatch({ type: "ADD_LETTER_TO_COLOR_LIST", payload: { color: 'grey', letter: rounds[currentRound].guess[i] }});
    //         dispatch({ type: "ADD_LETTER_BY_COLOR", payload: { color: 'grey', data: { letter: rounds[currentRound].guess[i], spot: i }}});
    //         dispatch({ type: "ADD_LETTER_BY_SPOT", payload: { spot: i, data: { letter: rounds[currentRound].guess[i], color: 'grey' }}});
    //     })
    // };

    // const updateYellows = () => {
    //     if (rounds[currentRound].score.byColor.yellow.length) {
    //         return;
    //     }
    //     rounds[currentRound].score.byColor.yellow.forEach(spot => {
    //         if (letterColors[spot.letter] === 'green') {
    //             return;
    //         }
    //         dispatch({ type: 'ADD_COLOR_TO_LETTER', payload: { letter: spot.letter, color: 'yellow'}})
    //         // letterColors[spot.letter] = 'yellow';
    
    //     });
    // }
    
    // const updateGreys = () => {
    //     if (!rounds[currentRound].score.byColor.grey.length === 0) {
    //         return;
    //     }
    
    //     rounds[currentRound].score.byColor.grey.forEach(spot => {
    //         if (letterColors[spot.letter] === 'green' || letterColors[spot.letter] === 'yellow') {
    //             return;
    //         }

    //         dispatch({ type: 'ADD_COLOR_TO_LETTER', payload: { letter: spot.letter, color: 'grey'}})
    //         // game.letterColors[spot.letter] = 'grey';
    //     });
    // }
    
    // const updateGreens = () => {
    //     if (rounds[currentRound].score.byColor.green.length === 0) {
    //         return;
    //     }

    //     rounds[currentRound].score.byColor.green.forEach((spot, i) => {
    //         dispatch({ type: 'ADD_COLOR_TO_LETTER', payload: { letter: spot.letter, color: 'green'}});
    //         //game.letterColors[spot.letter] = 'green';
    //     });
    // }

    // const updateLetterColors = () => {
    //     updateGreens();
    //     updateYellows();
    //     updateGreys();
    // }
    

    // const formatRow = (round) => {
    //     return round.score.bySpot;
    // };

    // const updateBoard = (currentRound, rounds) => {
    //     for (let r = 0; r <= currentRound; r++) {
    //         dispatch({ type: "ADD_BOARD_ROW", payload: formatRow(rounds[r]) })
    //     }
    // };

    // const checkGuess = () => {
    //     checkGreen();
    //     checkYellow();
    //     checkGrey();
    //     updateLetterColors();
    //     updateGameboard();
    //     updateKeyboard();
    // };

    // const updateGame = (guess) => {
    //     dispatch({ type: "UPDATE_PREVIOUS_GUESS", payload: guess });
    // }

    // const processGuess = (guess) => {
    //     // Validate guess
    //     checkGuess(guess);
    //     updateGame(guess);
    // }

    // const handleSubmitGuess = async (e) => {
    //     console.log(e);
    //     dispatch({ type: 'ADD_USER_GUESS', payload: guess.toLowerCase() });
    //     processGuess(guess);
    //     updateBoard();
    // };

    // const handleKeyPress = (e) => {
    //     console.log(e);
    //     return;
    // };

    // // useEffect(() => {
    // //     // if status is new
    // //     // send dispatch to set answer, set status to ON and round to 1

    // // }, [currentRound, dispatch, status]);

    // useEffect(() => {
    //     const isGameOver = () => {
    //         if (currentRound === answer.length - 1) {
    //             return true;
    //         }
        
    //         if (isGuessed(previousGuess)) {
    //             return true;
    //         }
        
    //         return false;
    //     }
        
    //     const isGuessed = (guess) => {
    //         return (guess && guess === answer);
    //     }

    //     if (status === 'NEW') {
    //         dispatch({ type: 'RESTART' });
    //     }

    //     if (!isGameOver(isGuessed)) {
    //         dispatch({ type: 'INCREMENT_ROUND' });
    //     }

    //     dispatch({ type: 'GAME_ENDED' });
    // })

    return (
        <div className="game">
            {(status === 'GAME_ENDED') && (
                <div>
                    hi
                    {/* <GameRecap isOpen={true} /> */}
                    {/* <RestartGameButton /> */}
                </div>
            )}
            {/* <Gameboard /> */}
            {/* <Keyboard handleKeyPress={handleKeyPress} handleSubmit={handleSubmitGuess} /> */}
        </div>
    );
};

export default Game;
