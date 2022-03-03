import React from 'react';
import { useGameState } from './GameContext';

const CurrentBoard = ({board}) => {
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

const RestOfBoard = ({ answer, currentRound}) => {
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


export const Gameboard = () => {
    const { currentRound, answer, board } = useGameState();

    return (
        <div className="game-board">
            {return (
            <>
              <div className="row" id={`row-${i}`}>
                  {Object.values(row).map(({ letter, color, s }) => {
                      return (
                          <div
                            className={`spot spot-${color}`}
                            id={`round-${i}-spot-${s}`}
                            data-letter="letter"
                            key={`round-${i}-spot-${s}`}
                          >
                            <input value={letter} type="text" />
                          </div>
                      );
                  })}
              </div>
          </>
          );}
        </div>
    );
};