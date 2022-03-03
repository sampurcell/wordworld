import React from 'react';
import { useGameDispatch } from './GameContext';

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
};
