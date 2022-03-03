// import React from 'react';
// import { useGameState } from './GameContext';

// export const Keyboard = ({ handleKeyPress, handleSubmit }) => {
//     const { keyboard } = useGameState();
//     return (
//         <div id="keyboard">
//             {keyboard.rows.map((row) => {
//                 return (
//                     <div className="row">
//                         {row.map(char => {
//                             if (char === "enter") {
//                                 return (
//                                     <button
//                                         data-key="enter"
//                                         onClick={handleSubmit}
//                                         onKeyPress={handleKeyPress}>
//                                             {char}
//                                     </button>
//                                 );
//                             }

//                             if (char === "del") {
//                                 return (
//                                     <button
//                                         data-key={`${char}`}
//                                         value={`${char}`}
//                                         onClick={handleKeyPress}
//                                         onKeyPress={handleKeyPress}
//                                     >
//                                         {char}
//                                     </button>
//                                 );
//                             }

//                             return (
//                                 <button
//                                     data-key={`${char}`}
//                                     value={`${char}`}
//                                     onClick={handleKeyPress}
//                                     onKeyPress={handleKeyPress}
//                                 >
//                                     {char}
//                                 </button>
//                             );
//                         })}
//                     </div>
//                 )
//             })}
//         </div>
//     );
// };