import { ANSWER_WORDS } from './lists/words_answers';

const filterWords = (words) => {
    return Object.fromEntries(Object.entries(words).filter(([word, isUsed]) => {
        return isUsed === false;
    }))
};

export const getNewAnswer = () => {
    const unusedWords = filterWords(ANSWER_WORDS);
    console.log("unusedWords", unusedWords);
    const wordIndex = Math.floor(Math.random()*Object.keys(unusedWords).length);
    console.log("wordIndex", wordIndex)
    const word = Object.keys(unusedWords)[wordIndex];
    console.log("word", word)
    ANSWER_WORDS[word] = true;
    return word;
};

// Possible Status values: 'NEW' | 'ON' | 'ENDED'
export const initialState = {
    status: "NEW",
    currentRound: 0,
    answer: getNewAnswer(),
    previousGuess: '',
    rounds: [
        {
            round: 0,
            guess: '',
            score: {
                bySpot: {
                    0: [],
                    1: [],
                    2: [],
                    3: [],
                    4: [],
                },
                byColor: {
                    green: [],
                    yellow: [],
                    grey: [],
                },
            }
        },
        {
            round: 1,
            guess: '',
            score: {
                bySpot: {
                    0: [],
                    1: [],
                    2: [],
                    3: [],
                    4: [],
                },
                byColor: {
                    green: [],
                    yellow: [],
                    grey: [],
                },

            }
        },
        {
            round: 2,
            guess: '',
            score: {
                bySpot: {
                    0: [],
                    1: [],
                    2: [],
                    3: [],
                    4: [],
                },
                byColor: {
                    green: [],
                    yellow: [],
                    grey: [],
                },
            }
        },
        {
            round: 3,
            guess: '',
            score: {
                bySpot: {
                    0: [],
                    1: [],
                    2: [],
                    3: [],
                    4: [],
                },
                byColor: {
                    green: [],
                    yellow: [],
                    grey: [],
                },            }
        },
        {
            round: 4,
            guess: '',
            score: {
                bySpot: {
                    0: [],
                    1: [],
                    2: [],
                    3: [],
                    4: [],
                },
                byColor: {
                    green: [],
                    yellow: [],
                    grey: [],
                },
            }
        },
        {
            round: 5,
            guess: '',
            score: {
                bySpot: {
                    0: [],
                    1: [],
                    2: [],
                    3: [],
                    4: [],
                },
                byColor: {
                    green: [],
                    yellow: [],
                    grey: [],
                },
            }
        },
    ],
    colorLetters: {
        green: [],
        yellow: [],
        grey: [],
    },
    letterColors: {
        'a': null,
        'b': null,
        'c': null,
        'd': null,
        'e': null,
        'f': null,
        'g': null,
        'h': null,
        'i': null,
        'j': null,
        'k': null,
        'l': null,
        'm': null,
        'n': null,
        'o': null,
        'p': null,
        'q': null,
        'r': null,
        's': null,
        't': null,
        'u': null,
        'v': null,
        'w': null,
        'x': null,
        'y': null,
        'z': null,
    },
    board: [],
};

export const reducer = (state, action) => {
  console.log(`Type: ${action.type}`);

  switch (action.type) {
    case "START":
        return { ...initialState, status: "ON" };
    case "RESTART":
        return { ...initialState, status: "NEW", currentRound: 0, answer: getNewAnswer() };
    case "GAME_OVER":
    case "GUESSED":
      return { ...state, status: "ENDED" };
    case "ADD_USER_GUESS":
        return {
            ...state,
            rounds: {
                ...state.rounds,
                [state.currentRound]: {
                    ...state.rounds[state.currentRound],
                    guess: action.payload
                },
            },
        };
    case "ADD_LETTER_BY_COLOR":
        return {
            ...state,
            rounds: {
                ...state.rounds,
                [state.currentRound]: {
                    ...state.rounds[state.currentRound],
                    score: {
                        ...state.rounds[state.currentRound].score,
                        byColor: {
                            ...state.rounds[state.currentRound].score.byColor,
                            [action.payload.color]: [...state.rounds[state.currentRound].score.byColor[action.payload.color], action.payload.data],
                        },
                    }
                }
            },
        };
    case "ADD_LETTER_BY_SPOT":
        return {
            ...state,
            rounds: {
                ...state.rounds,
                [state.currentRound]: {
                    ...state.rounds[state.currentRound],
                    score: {
                        ...state.rounds[state.currentRound].score,
                        bySpot: {
                            ...state.rounds[state.currentRound].score.bySpot,
                            [action.payload.spot]: [...state.rounds[state.currentRound].score.bySpot[action.payload.spot], action.payload.data],
                        },
                    }
                }
            },
        };
    case "ADD_LETTER_TO_COLOR_LIST":
        return {
            ...state,
            colorLetters: {
                ...state.colorLetters,
                [action.color]: [...state.colorLetters[action.color], action.payload],
            }
        }
    case "ADD_BOARD_ROW":
        return {
            ...state,
            board: [ ...state.board, action.payload]
        };
    case "ADD_COLOR_TO_LETTER":
        return {
            ...state,
            letterColors: {
                ...state.letterColors,
                [action.payload.letter]: action.payload.color,
            }
         };
    case "UPDATE_PREVIOUS_GUESS":
        return {
            ...state,
            previousGuess: action.payload,
        };
    case "INCREMENT_ROUND":
        return { ...state, round: state.round + 1 };
    case "TICK":
      console.warn("TICK action has not been implemented");
      return state;
    case "KEYPRESS":
      console.warn("KEYPRESS action has not been implemented");
      return state;
    default:
      return state;
  }
};
