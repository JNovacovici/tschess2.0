import React, { useState } from 'react';
import './App.css';
import Board from './components/Board';
import ChessBoard from './ChessBoard/ChessBoard';
import { Color } from './Pieces/Piece';

function App() {
  const [chessBoard, setChessBoard] = useState(ChessBoard.createNewBoard());
  const [currentPlayerColor, setCurrentPlayerColor] = useState(Color.WHITE);

  const handleSetChessBoard = (newBoard: ChessBoard) => {
    setChessBoard(newBoard);
    setCurrentPlayerColor(currentPlayerColor === Color.WHITE ? Color.BLACK : Color.WHITE);
  }

  return (
    <div className="App bg-slate-500 h-screen">
      <Board
        board={chessBoard}
        setChessBoard={handleSetChessBoard}
        currentPlayerColor={currentPlayerColor} />
    </div>
  );
}

export default App;
