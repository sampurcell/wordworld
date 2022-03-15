import { GAME_WORDS } from './lists/words';

const filterWords = (words) => {
    return Object.fromEntries(Object.entries(words)
        .filter(([word, isUsed]) => {
            return isUsed === false;
    }));
};

export const getNewAnswer = () => {
    const unusedWords = filterWords(GAME_WORDS.ANSWERS);
    const wordIndex = Math.floor(
        Math.random() * Object.keys(unusedWords).length
    );
    const word = Object.keys(unusedWords)[wordIndex];
    GAME_WORDS.ANSWERS[word] = true;

    return word;
};

export const initialState = {
    gameRounds: 6,
    status: "NEW",
    winStatus: "",
    currentRound: 0,
    answer: getNewAnswer(),
    toasterMessage: "",
    toasterDuration: 0,
    modalOpen: false,
    board: {
        rows: [{
            number: 0,
            length: 5,
            letters: "",
            state: "",
            tiles: [{
                number: 0,
                state: "empty",
                animation: "idle",
                letter: "",                
            }, {
                number: 1,
                state: "empty",
                animation: "idle",
                letter: "",                
            }, {
                number: 2,
                state: "empty",
                animation: "idle",
                letter: "",                
            }, {
                number: 3,
                state: "empty",
                animation: "idle",
                letter: "",                
            }, {
                number: 4,
                state: "empty",
                animation: "idle",
                letter: "",                
            }],
        },
        {
            number: 1,
            length: 5,
            letters: "",
            state: "",
            evaluation: { 0: "tbd", 1: "tbd", 2: "tbd", 3: "tbd", 4: "tbd" },
            tiles: [{
                number: 0,
                state: "empty",
                animation: "idle",
                letter: "",                
            }, {
                number: 1,
                state: "empty",
                animation: "idle",
                letter: "",                
            }, {
                number: 2,
                state: "empty",
                animation: "idle",
                letter: "",                
            }, {
                number: 3,
                state: "empty",
                animation: "idle",
                letter: "",                
            }, {
                number: 4,
                state: "empty",
                animation: "idle",
                letter: "",                
            }],
        },
        {
            number: 2,
            length: 5,
            letters: "",
            state: "",
            evaluation: { 0: "tbd", 1: "tbd", 2: "tbd", 3: "tbd", 4: "tbd" },
            tiles: [{
                number: 0,
                state: "empty",
                animation: "idle",
                letter: "",                
            }, {
                number: 1,
                state: "empty",
                animation: "idle",
                letter: "",                
            }, {
                number: 2,
                state: "empty",
                animation: "idle",
                letter: "",                
            }, {
                number: 3,
                state: "empty",
                animation: "idle",
                letter: "",                
            }, {
                number: 4,
                state: "empty",
                animation: "idle",
                letter: "",                
            }],
        },
        {
            number: 3,
            length: 5,
            letters: "",
            state: "",
            evaluation: { 0: "tbd", 1: "tbd", 2: "tbd", 3: "tbd", 4: "tbd" },
            tiles: [{
                number: 0,
                state: "empty",
                animation: "idle",
                letter: "",                
            }, {
                number: 1,
                state: "empty",
                animation: "idle",
                letter: "",                
            }, {
                number: 2,
                state: "empty",
                animation: "idle",
                letter: "",                
            }, {
                number: 3,
                state: "empty",
                animation: "idle",
                letter: "",                
            }, {
                number: 4,
                state: "empty",
                animation: "idle",
                letter: "",                
            }],
        },
        {
            number: 4,
            length: 5,
            letters: "",
            state: "",
            evaluation: { 0: "tbd", 1: "tbd", 2: "tbd", 3: "tbd", 4: "tbd" },
            tiles: [{
                number: 0,
                state: "empty",
                animation: "idle",
                letter: "",                
            }, {
                number: 1,
                state: "empty",
                animation: "idle",
                letter: "",                
            }, {
                number: 2,
                state: "empty",
                animation: "idle",
                letter: "",                
            }, {
                number: 3,
                state: "empty",
                animation: "idle",
                letter: "",                
            }, {
                number: 4,
                state: "empty",
                animation: "idle",
                letter: "",                
            }],
        },
        {
            number: 5,
            length: 5,
            letters: "",
            state: "",
            evaluation: { 0: "tbd", 1: "tbd", 2: "tbd", 3: "tbd", 4: "tbd" },
            tiles: [{
                number: 0,
                state: "empty",
                animation: "idle",
                letter: "",                
            }, {
                number: 1,
                state: "empty",
                animation: "idle",
                letter: "",                
            }, {
                number: 2,
                state: "empty",
                animation: "idle",
                letter: "",                
            }, {
                number: 3,
                state: "empty",
                animation: "idle",
                letter: "",                
            }, {
                number: 4,
                state: "empty",
                animation: "idle",
                letter: "",                
            }],
        }]
    },
    keyboard: {
        "q": { letter: "q", state: "", row: 1 },
        "w": { letter: "w", state: "", row: 1 },
        "e": { letter: "e", state: "", row: 1 },
        "r": { letter: "r", state: "", row: 1 },
        "t": { letter: "t", state: "", row: 1 },
        "y": { letter: "y", state: "", row: 1 },
        "u": { letter: "u", state: "", row: 1 },
        "i": { letter: "i", state: "", row: 1 },
        "o": { letter: "o", state: "", row: 1 },
        "p": { letter: "p", state: "", row: 1 },
        "a": { letter: "a", state: "", row: 2 },
        "s": { letter: "s", state: "", row: 2 },
        "d": { letter: "d", state: "", row: 2 },
        "f": { letter: "f", state: "", row: 2 },
        "g": { letter: "g", state: "", row: 2 },
        "h": { letter: "h", state: "", row: 2 },
        "j": { letter: "j", state: "", row: 2 },
        "k": { letter: "k", state: "", row: 2 },
        "l": { letter: "l", state: "", row: 2 },
        "Enter": { letter: "Enter", state: "", row: 3 },
        "z": { letter: "z", state: "", row: 3 },
        "x": { letter: "x", state: "", row: 3 },
        "c": { letter: "c", state: "", row: 3 },
        "v": { letter: "v", state: "", row: 3 },
        "b": { letter: "b", state: "", row: 3 },
        "n": { letter: "n", state: "", row: 3 },
        "m": { letter: "m", state: "", row: 3 },
        "Backspace": { letter: "Backspace", state: "", row: 3 },
    },
};

export const reducer = (state, action) => {
    switch (action.type) {
    case "START":
        return { ...initialState, status: "ON" };
    case "RESTART":
        return {
            ...initialState,
            answer: getNewAnswer(),
            currentRound: 0,
            winStatus: '',
            status: 'NEW',
        };
    case "GUESSED":
      return { ...state, status: "ENDED" };
    case "ADD_USER_GUESS":
        return {
            ...state,
            rounds: {
                ...state.rounds,
                [state.currentRound]: {
                    ...state.rounds[state.currentRound],
                    guess: action.payload,
                },
            },
        };
    case "ADD_BOARD_ROW":
        return {
            ...state,
            board: [ ...state.board, action.payload],
        };
    case "ADD_COLOR_TO_LETTER":
        return {
            ...state,
            letterColors: {
                ...state.letterColors,
                [action.payload.letter]: action.payload.color,
            },
        };
    case "UPDATE_PREVIOUS_GUESS":
        return {
            ...state,
            previousGuess: action.payload,
        };
    case "UPDATE_GAME":
        return {
            ...state,
            currentRound: state.currentRound + 1
        };
    case "INCREMENT_ROUND":
        return { ...state, round: state.round + 1 };
    case "TICK":
      console.warn("TICK action has not been implemented");
      return state;
    case "KEYPRESS":
      console.warn("KEYPRESS action has not been implemented");
      return state;
    case "UPDATE_TILE_STATE":
        return {
            ...state,
            board: {
                ...state.board,
                rows: state.board.rows.map(
                    (row, i) => {
                        return (
                            (i === state.currentRound)
                                ? updateTileState(row, action)
                                : row
                        );
                    }
                ),
            },
        };
    case "UPDATE_TILE_EVALUATION":
        return {
            ...state,
            board: {
                ...state.board,
                rows: state.board.rows.map(
                    (row, i) => {
                        return (
                            (i === state.currentRound)
                                ? updateTileEvaluation(row, action)
                                : row
                        );
                    }
                ),
            },
        };
    case "ADD_LETTER_TO_TILE":
        return {
            ...state,
            board: {
                ...state.board,
                rows: state.board.rows.map(
                    (row, i) => {
                        return (i === state.currentRound) ? addLetter(row, action) : row;
                }),
            },
        };
    case "REMOVE_LETTER_FROM_TILE":
        return {
            ...state,
            board: {
                rows: state.board.rows.map(
                    (row, i) => {
                        return (i === state.currentRound) ? removeLetter(row, action) : row;
                }),
            },
        };
    case "UPDATE_KEYBOARD":
        return {
            ...state,
            keyboard: {
                ...state.keyboard,
                ...action.payload,
            },
        };
    case "ANIMATE_ROW":
        return {
            ...state,
            board: {
                ...state.board,
                rows: state.board.rows.map(
                    (row, i) => (i === state.currentRound)
                        ? animateTiles(row, action)
                        : row),
            },
        };
    case "ADD_ROW_STATE":
        return {
            ...state,
            board: {
                ...state.board,
                rows: state.board.rows.map(
                    (row, i) => (i === state.currentRound ? addRowState(row, action) : row)
                ),
            }
        }
    case "ADD_TOASTER_STATE":
        return {
            ...state,
            toasterMessage: action.payload.message,
            toasterDuration: action.payload.duration,
        }
    case "GAME_OVER":
        return {
            ...state,
            status: 'ENDED',
            currentRound: 0,
        }
    case "UPDATE_MODAL_STATE":
        return {
            ...state,
            modalOpen: action.payload,
        };
    default:
        return state;
  }
};

function removeLetter(row) {
    return {
        ...row,
        letters: row.letters
            .split("")
            .slice(0, -1)
            .join(""),
        tiles: row.tiles
            .map((tile, i) => {
                const rowLetters = row.letters.split("");

                if (rowLetters.length === 0) {
                    return tile;
                }

                if (tile.number === rowLetters.length - 1) {
                    return {
                        number: i,
                        state: "empty",
                        animation: "idle",
                        letter: "",
                    };
                }

                return tile;
            }),
    };
}

function updateTileState(row, action) {
    return {
        ...row,
        tiles: row.tiles.map((tile, i) => {
            if (tile.number === action.payload.number) {
                return {
                    ...tile,
                    state: action.payload.state,
                };
            }

            return tile;
        }),
    };
}

function updateTileEvaluation(row, action) {
    return {
        ...row,
        evaluation: {
            ...row.evaluation,
            [action.payload.number]: action.payload.state,
        },
    };
}

function animateTiles(row, action) {
    return {
        ...row,
        tiles: row.tiles.map((tile) => {
            return {
                ...tile,
                animation: 'flip-in',
            };
        }),
    };
}

function addLetter(row, action) {
    const rowFilled =  row.letters.length === row.length;

    return {
        ...row,
        letters: rowFilled
            ? row.letters
            : row.letters + action.payload.letter,
        tiles: row.tiles.map((tile, i) => {
           if (tile.number === row.letters.split("").length) {
                return {
                    number: i,
                    state: "tbd",
                    animation: "idle",
                    letter: action.payload.letter,
                };
           }

           return tile;
        }),
    };
}

function addRowState(row, action) {
    return {
        ...row,
        state: action.payload,
    };
}
