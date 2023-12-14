import React, { useState } from 'react'
import ChessBoard from '../ChessBoard/ChessBoard';
import { Position } from '../ChessBoard/Postition';
import classNames from 'classnames';

type Props = {
  board: ChessBoard;
  setChessBoard: (board: ChessBoard) => void;
  currentPlayerColor: string;
}

const Board = ({board, setChessBoard, currentPlayerColor}: Props) => {
  const currentBoard = board.getCurrentBoard();
  const [clickedPosition, setClickedPosition] = useState<Position | null>(null)
  const clickedPiece = clickedPosition != null ? board.getPiece(clickedPosition) : null;

  const isEven = (num: number) => num % 2 === 0;

  const handleTileClick = (row: number, col: number) => {
    const piece = board.getPiece({ x: col, y: row });
    console.log(piece);

    if (clickedPosition == null && piece && piece?.getColor() === currentPlayerColor) {
      setClickedPosition({x: col, y: row});
    } else if (clickedPosition) {
      const canMove = board.movePiece(clickedPosition, {x: col, y: row});
      if(canMove) {
        setChessBoard(board.clone());
      }
      setClickedPosition(null);
    }
  }

  console.log(clickedPosition != null && clickedPiece?.validMoves(clickedPosition, board));

  return (
    <div className='flex flex-col justify-center items-center'>
      {currentBoard.map((row, rowIndex) => (
        <div key={rowIndex} className="flex flex-row">
          {row.map((piece, colIndex) => (
            <div
              onClick={() => handleTileClick(rowIndex, colIndex)}
              key={colIndex}
              className={classNames(`flex justify-center items-center text-7xl w-20 h-20 border border-black
                ${isEven(rowIndex + colIndex) ? 'bg-whitetile' : 'bg-blacktile'}`, {'border-yellow-500 border-4': clickedPosition != null && clickedPiece?.validMoves(clickedPosition, board)[rowIndex][colIndex]})}>
              {piece?.getUnicode()}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;