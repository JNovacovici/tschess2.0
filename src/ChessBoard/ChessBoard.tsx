import Bishop from "../Pieces/Bishop";
import King from "../Pieces/King";
import Knight from "../Pieces/Knight";
import Pawn from "../Pieces/Pawn";
import ChessPiece, { Color } from "../Pieces/Piece";
import Queen from "../Pieces/Queen";
import Rook from "../Pieces/Rook";
import { Position } from "../ChessBoard/Postition";

const horizontalAxis = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const verticalAxis = ['1', '2', '3', '4', '5', '6', '7', '8'];

// export interface PieceObj {
//   icon: Piece;
//   x: number;
//   y: number;
//   team: string;
//   enPassant?: boolean;
// }

abstract class ChessBoard {
  private board: (ChessPiece | null)[][];

  constructor() {
    this.board = [
      [
        new Rook(Color.BLACK),
        new Knight(Color.BLACK),
        new Bishop(Color.BLACK),
        new Queen(Color.BLACK),
        new King(Color.BLACK),
        new Bishop(Color.BLACK),
        new Knight(Color.BLACK),
        new Rook(Color.BLACK),
      ],
      [
        new Pawn(Color.BLACK),
        new Pawn(Color.BLACK),
        new Pawn(Color.BLACK),
        new Pawn(Color.BLACK),
        new Pawn(Color.BLACK),
        new Pawn(Color.BLACK),
        new Pawn(Color.BLACK),
        new Pawn(Color.BLACK),
      ],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [
        new Pawn(Color.WHITE),
        new Pawn(Color.WHITE),
        new Pawn(Color.WHITE),
        new Pawn(Color.WHITE),
        new Pawn(Color.WHITE),
        new Pawn(Color.WHITE),
        new Pawn(Color.WHITE),
        new Pawn(Color.WHITE),
      ],
      [
        new Rook(Color.WHITE),
        new Knight(Color.WHITE),
        new Bishop(Color.WHITE),
        new Queen(Color.WHITE),
        new King(Color.WHITE),
        new Bishop(Color.WHITE),
        new Knight(Color.WHITE),
        new Rook(Color.WHITE),
      ]
    ];
  }

  getCurrentBoard(): (ChessPiece | null)[][] {
    return this.board;
  }

  getPiece(pos: Position): (ChessPiece | null) {
    return this.board[pos.y][pos.x];
  }

  movePiece(fromPosition: Position, newPosition: Position): boolean {
    // Top left element represents 0,0
    const piece = this.getPiece(fromPosition);
    if (piece?.canMove(fromPosition, newPosition, this)) {
      this.board[fromPosition.y][fromPosition.x] = null;
      this.board[newPosition.y][newPosition.x] = piece;
      return true;
    }
    return false;
  }
}

export default ChessBoard;