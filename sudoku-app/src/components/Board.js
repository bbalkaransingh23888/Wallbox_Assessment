import React, { useState } from 'react';
import './Board.css';

const initialBoard = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9],
];

const Board = () => {
  const [board, setBoard] = useState(initialBoard);

  const handleChange = (e, row, col) => {
    const value = e.target.value ? parseInt(e.target.value) : 0;
    const newBoard = [...board];
    newBoard[row][col] = value;
    setBoard(newBoard);
  };

  const renderSquare = (row, col) => {
    return (
      <input
        type="number"
        min="1"
        max="9"
        className="square"
        value={board[row][col] === 0 ? '' : board[row][col]}
        onChange={(e) => handleChange(e, row, col)}
      />
    );
  };

  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((col, colIndex) => (
            <div key={colIndex} className="col">
              {renderSquare(rowIndex, colIndex)}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
