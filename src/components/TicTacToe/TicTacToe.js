import React, { useState, Children } from "react";
import styles from './TicTacToe.module.css';

function TicTacToe() {
  // (Math.sqrt(numberOfSquares) % 2 === 0)
  const [board, setBoard] = useState(new Array(9).fill(''));
  const [lastSymbol, setLastSymbol] = useState('O');
  const [winningCombination, setWinningCombination] = useState([]);

  const winCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontally
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertically
    [0, 4, 8], [2, 4, 6]             // diagonally
  ]

  const handleClick = (i) => {
    if (board[i] === '') {
      const symbol = lastSymbol === 'O' ? 'X' : 'O';
      setLastSymbol(symbol);
      let boardCopy = board.slice();
      boardCopy[i] = symbol;
      setBoard(boardCopy);

      let winningCombLocal = [];
      winCombinations.forEach(line => {
        let won = line.every(index => boardCopy[index] === symbol);
        if (won) {
          winningCombLocal = line;
          setTimeout(() => {
            alert(`Player ${symbol} won, Press Ok to restart game!!!`);
            restartGame();
          });
        }
      })

      if (winningCombLocal.length > 0) {
        setWinningCombination(winningCombLocal);
        return false; // exit if game already won
      }

      if (boardCopy.every(index => index !== '')) {
        setTimeout(() => {
          alert(`It's a draw, Press Ok to restart game!!!`);
          restartGame();
        });
      }
    }
  }

  function restartGame() {
    setBoard(new Array(9).fill(''));
    setLastSymbol('O');
    setWinningCombination([]);
  }

  return (
    <div className={styles['game-board']}>
      {Children.toArray(board.map((item, i) => (
        <div
          className={styles.box}
          onClick={() => handleClick(i)}
          style={{
            'cursor' : item === '' ? 'pointer' : 'default',
            'backgroundColor': winningCombination.includes(i) ? 'orange' : 'transparent'
          }}>
          {item}
        </div>
      )))}
    </div>
  );
}

export default TicTacToe;
