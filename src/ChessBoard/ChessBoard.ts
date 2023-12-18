import Bishop from "../Pieces/Bishop";
import King from "../Pieces/King";
import Knight from "../Pieces/Knight";
import Pawn from "../Pieces/Pawn";
import ChessPiece, { Color } from "../Pieces/Piece";
import Queen from "../Pieces/Queen";
import Rook from "../Pieces/Rook";
import { Position } from "./Postition";

// const horizontalAxis = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
// const verticalAxis = ['1', '2', '3', '4', '5', '6', '7', '8'];

// export interface PieceObj {
//   icon: Piece;
//   x: number;
//   y: number;
//   team: string;
//   enPassant?: boolean;
// }

class ChessBoard {
  private board: (ChessPiece | null)[][];

  constructor(pieces: (ChessPiece | null)[][]) {
    this.board = pieces;
  }

  clone(): ChessBoard {
    return new ChessBoard(this.board);
  }

  static createNewBoard(): ChessBoard {
    return new ChessBoard([
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
    ]);
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
    console.log(piece);
    if (piece?.canMove(fromPosition, newPosition, this)) {
      const oldBoard = this.board.map(row => [...row]);
      if (piece instanceof King) {
        const { rook, rookPosition, canCastle } = piece.canCastle(fromPosition, newPosition, this);
        if (canCastle) {
          this.board[fromPosition.y][fromPosition.x] = null;
          this.board[newPosition.y][newPosition.x] = piece;

          this.board[rookPosition.y][rookPosition.x] = null;
          const rookTo = { x: newPosition.x > fromPosition.x ? fromPosition.x + 1 : fromPosition.x - 1, y: fromPosition.y };
          this.board[rookTo.y][rookTo.x] = rook;

          piece.markAsMadeFirstMove();
          rook?.markAsMadeFirstMove();
          return true;
        }
      }
      this.board[fromPosition.y][fromPosition.x] = null;
      this.board[newPosition.y][newPosition.x] = piece;
      if (this.isKingInCheck(piece.getColor())) {
        //revert board to old state/piece location
        this.board = oldBoard;
        return false;
      }
      piece.markAsMadeFirstMove();
      return true;
    }
    return false;
  }

  isKingInCheck(color: Color): boolean {
    const kingPosition = this.findKingPosition(color);
    if (!kingPosition) return false;
    const king = this.getPiece(kingPosition) as King;
    return king.isInCheck(kingPosition, this);
  }

  findKingPosition(color: Color): Position | null {
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        const piece = this.board[i][j];
        if (piece instanceof King && piece.getColor() === color) {
          return { x: j, y: i };
        }
      }
    }
    return null;
  }
}

export default ChessBoard;