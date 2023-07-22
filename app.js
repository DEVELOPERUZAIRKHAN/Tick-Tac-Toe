import { useState } from "react";

function Square({ winner, index, value, onSquareClick }) {
  let myStyle={}
  for (let i = 0; i < winner.length; i++) {
  if(winner[i]===index){
    myStyle={backgroundColor:"blue"}
  }
    
  }
  
  
  return (
    <button style={myStyle} className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Game() {
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];
  function handlePlay(nextSquares) {
    // handle play logic
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setXIsNext(!xIsNext);
  }

  function jumpTo(move) {
    // Todo
    setCurrentMove(move);
    if (move % 2 === 0) {
      setXIsNext(true);
    } else {
      setXIsNext(false);
    }
  }
  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move no" + move;
    } else {
      description = "Go to start of the game";
    }

    return (
      <li key={move}>
        <button
          onClick={() => {
            jumpTo(move);
          }}
        >
          {description}
        </button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board onPlay={handlePlay} squares={currentSquares} xIsNext={xIsNext} />
      </div>

      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function Board({ xIsNext, onPlay, squares }) {
  let status = "X to move";
  let {winner,arr} = calculateWinner(squares);
  if (winner) {
    status = "Winner is " + winner;
  } else {
    status = xIsNext ? "X to move" : "O to move";
  }
  function handleClick(i) {
    if (squares[i] || winner) {
      return;
    }
    const nextSquares = squares.slice();

    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }

    onPlay(nextSquares);
  }

  return (
    <>
      <div>{status}</div>
      <div className="board-row">
        <Square winner={arr} index={0} value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square winner={arr} index={1} value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square winner={arr} index={2} value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square winner={arr} index={3} value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square winner={arr} index={4} value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square winner={arr} index={5} value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square winner={arr} index={6} value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square winner={arr} index={7} value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square winner={arr} index={8} value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

function calculateWinner(squares) {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {winner:squares[a],arr:[a,b,c]};
    }
  }

  return {winner:null,arr:[null,null,null]};
}