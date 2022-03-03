import React, { useState } from 'react';
import { useGameState } from './GameContext';

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