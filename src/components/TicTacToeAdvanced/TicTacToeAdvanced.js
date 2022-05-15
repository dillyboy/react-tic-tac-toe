import React, { useState, Children, useEffect } from "react";
import styles from './TicTacToeAdvanced.module.css';

function TicTacToeAdvanced({noOfSquares}) {
  const [valid, setValid] = useState(false);
  const [board, setBoard] = useState([]);
  const [lastSymbol, setLastSymbol] = useState('O');
  const [winCombinations, setWinCombinations] = useState([]);
  const [winningCombination, setWinningCombination] = useState([]);

  useEffect(() => {
    setBoard(new Array(noOfSquares).fill(''));
    const sqrt =  Math.sqrt(noOfSquares);
    let initialWinCombinations = [];

    if (Number.isInteger(sqrt)) {
      setValid(true);
      let count = 0;
      const twoDArray = [];
      for (let i = 0; i < sqrt; i++) {
        let arr = [];
        for (let j = 0; j < sqrt; j++) {
          arr.push(count);
          count++;
        }
        twoDArray.push(arr);
      }
      initialWinCombinations = twoDArray.slice();  // add all horizontal win combinations

      for (let i = 0; i < twoDArray.length; i++) {
        let arr = [];
        for (let j = 0; j < twoDArray[i].length; j++) {
          arr.push(twoDArray[j][i]);
        }
        initialWinCombinations.push(arr); // add all vertical win combinations
      }

      let leftToRightDiagonal = [];
      let rightToLeftDiagonal = [];
      for (let i = 0; i < twoDArray.length; i++) {
        leftToRightDiagonal.push(twoDArray[i][i]);
        rightToLeftDiagonal.push(twoDArray[i][twoDArray.length - 1 - i]);
      }

      // all both diagonal win combinations
      initialWinCombinations.push(leftToRightDiagonal, rightToLeftDiagonal);

      // add local variable to state
      setWinCombinations(initialWinCombinations);

    } else {
      console.log('invalid input');
    }

  }, [])

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
    setBoard(new Array(noOfSquares).fill(''));
    setLastSymbol('O');
    setWinningCombination([]);
  }

  return (
    <>
      {valid ? (
        <div
          className={styles['game-board']}
          style={{
            'gridTemplate' : `repeat(${Math.sqrt(noOfSquares)}, 1fr) / repeat(${Math.sqrt(noOfSquares)}, 1fr)`
          }}
          >
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
      ) : <p style={{margin: '10px'}}>Invalid number of squares</p>}
    </>
  );
}

export default TicTacToeAdvanced;
