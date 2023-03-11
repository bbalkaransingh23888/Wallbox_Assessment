import React, { useState } from 'react';
import Board from './components/Board';
import Sudoku from './components/Sudoku';

var initialBoard = [  
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

const App = () => {
  const [board, setBoard] = useState(initialBoard);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const validateBoard = () => {
    // Check each row for duplicates
    for (let i = 0; i < board.length; i++) {
      const row = board[i];
      const rowSet = new Set(row);
      if (rowSet.size !== row.length) {
        setErrorMessage('Error: Duplicate values in a row');
        return false;
      }
    }

    // Check each column for duplicates
    for (let col = 0; col < 9; col++) {
      const colValues = [];
      for (let row = 0; row < 9; row++) {
        if (board[row][col] !== null) {
          colValues.push(board[row][col]);
        }
      }
      const colSet = new Set(colValues);
      if (colSet.size !== colValues.length) {
        setErrorMessage('Error: Duplicate values in a column');
        return false;
      }
    }

    // Check subgrids for duplicates
    for (let row = 0; row < 9; row += 3) {
      for (let col = 0; col < 9; col += 3) {
        const subgridValues = [];
        for (let i = row; i < row + 3; i++) {
          for (let j = col; j < col + 3; j++) {
            if (board[i][j] !== null) {
              subgridValues.push(board[i][j]);
            }
          }
        }
        const subgridSet = new Set(subgridValues);
        if (subgridSet.size !== subgridValues.length) {
          setErrorMessage('Error: Duplicate values in a subgrid');
          return false;
        }
      }
    }

    // If there are no errors and the board is complete, show success message
    if (isBoardComplete()) {
      setSuccessMessage('Completed!');
    }

    // Clear any existing error message
    setErrorMessage(null);

    return true;
  };
  // hello
  const isBoardComplete = () => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++)
{
        if (board[row][col] === null) {
          return false;
        }
      }
    }
    return true;
  };

  const handleBoardChange = (newBoard) => {
    setBoard(newBoard);
    setSuccessMessage(null);
    setErrorMessage(null);
  };

  return (
    <div className="App">
      {/* <h1>Hello, World!</h1> */}
      <h1>Sudoku Solver</h1>
      {errorMessage && <div className="error">{errorMessage}</div>}
      {successMessage && <div className="success">{successMessage}</div>}
      <Sudoku board={board} validateBoard={validateBoard} handleBoardChange={handleBoardChange} />
      <Board board={board} handleBoardChange={handleBoardChange} />
    </div>
  );
};

export default App;