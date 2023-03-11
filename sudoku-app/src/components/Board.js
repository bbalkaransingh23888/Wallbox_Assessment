import React, { useState } from 'react';
import './Board.css';

const initialBoard = [
  [5, 3, null, null, 7, null, null, null, null],
  [6, null, null, 1, 9, 5, null, null, null],
  [null, 9, 8, null, null, null, null, 6, null],
  [8, null, null, null, 6, null, null, null, 3],
  [4, null, null, 8, null, 3, null, null, 1],
  [7, null, null, null, 2, null, null, null, 6],
  [null, 6, null, null, null, null, 2, 8, null],
  [null, null, null, 4, 1, 9, null, null, 5],
  [null, null, null, null, 8, null, null, 7, 9],
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
