import React from 'react';

class Sudoku extends React.Component {
  state = {
    board: [
      [0, 2, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 6, 0, 0, 0, 0, 3],
      [0, 7, 4, 0, 8, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 3, 0, 0, 2],
      [0, 8, 0, 0, 4, 0, 0, 1, 0],
      [6, 0, 0, 5, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 0, 7, 8, 0],
      [5, 0, 0, 0, 0, 9, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 4, 0],
    ],
    errors: [],
    successMessage: '',
  };

  handleCheckAnswers = () => {
    const errors = this.validateBoard();
    this.setState({ errors });

    if (this.isBoardComplete() && errors.length === 0) {
      this.setState({ successMessage: 'Completed!' });
    }
  };

  isBoardComplete = () => {
    const { board } = this.state;
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) {
          return false;
        }
      }
    }
    return true;
  };

  validateBoard = () => {
    const { board } = this.state;
    const errors = [];

  //   // Check rows for duplicates
    for (let row = 0; row < 9; row++) {
      const rowValues = board[row].filter(val => val !== 0);
      if (new Set(rowValues).size !== rowValues.length) {
        errors.push(`Duplicate value(s) in row ${row + 1}`);
      }
    }

  //   // Check columns for duplicates
    for (let col = 0; col < 9; col++) {
      const colValues = board.map(row => row[col]).filter(val => val !== 0);
      if (new Set(colValues).size !== colValues.length) {
        errors.push(`Duplicate value(s) in column ${col + 1}`);
      }
    }

  //     // Check subgrids for duplicates
  for (let row = 0; row < 9; row += 3) {
    for (let col = 0; col < 9; col += 3) {
      const subgridValues = [];
      for (let i = row; i < row + 3; i++) {
        for (let j = col; j < col + 3; j++) {
          if (board[i][j] !== 0) {
            subgridValues.push(board[i][j]);
          }
        }
      }
      if (new Set(subgridValues).size !== subgridValues.length) {
        errors.push(`Duplicate value(s) in subgrid starting at row ${row + 1} and column ${col + 1}`);
      }
    }
  }

  return errors;
}
  render () {
    return <button onClick={this.handleCheckAnswers}>Check Answers</button>;
  }
};


export default Sudoku;