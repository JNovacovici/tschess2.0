import Bishop from "../Pieces/Bishop";
import King from "../Pieces/King";
import Knight from "../Pieces/Knight";
import Pawn from "../Pieces/Pawn";
import ChessPiece, { Color } from "../Pieces/Piece";
import Queen from "../Pieces/Queen";
import Rook from "../Pieces/Rook";

const horizontalAxis = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const verticalAxis = ['1', '2', '3', '4', '5', '6', '7', '8'];

// export interface PieceObj {
//   icon: Piece;
//   x: number;
//   y: number;
//   team: string;
//   enPassant?: boolean;
// }

class ChessBoard {
  private board: (ChessPiece | null)[][];

  constructor() {
    this.board = [
      [
        new Rook(Color.BLACK, { x: 0, y: 0 }),
        new Knight(Color.BLACK, { x: 0, y: 1 }),
        new Bishop(Color.BLACK, { x: 0, y: 2 }),
        new Queen(Color.BLACK, { x: 0, y: 3 }),
        new King(Color.BLACK, { x: 0, y: 4 }),
        new Bishop(Color.BLACK, { x: 0, y: 5 }),
        new Knight(Color.BLACK, { x: 0, y: 6 }),
        new Rook(Color.BLACK, { x: 0, y: 7 }),

      ],
      [
        new Pawn(Color.BLACK, { x: 1, y: 0 }),
        new Pawn(Color.BLACK, { x: 1, y: 1 }),
        new Pawn(Color.BLACK, { x: 1, y: 2 }),
        new Pawn(Color.BLACK, { x: 1, y: 3 }),
        new Pawn(Color.BLACK, { x: 1, y: 4 }),
        new Pawn(Color.BLACK, { x: 1, y: 5 }),
        new Pawn(Color.BLACK, { x: 1, y: 6 }),
        new Pawn(Color.BLACK, { x: 1, y: 7 }),
      ],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [
        new Pawn(Color.WHITE, { x: 6, y: 0 }),
        new Pawn(Color.WHITE, { x: 6, y: 1 }),
        new Pawn(Color.WHITE, { x: 6, y: 2 }),
        new Pawn(Color.WHITE, { x: 6, y: 3 }),
        new Pawn(Color.WHITE, { x: 6, y: 4 }),
        new Pawn(Color.WHITE, { x: 6, y: 5 }),
        new Pawn(Color.WHITE, { x: 6, y: 6 }),
        new Pawn(Color.WHITE, { x: 6, y: 7 }),
      ],
      [
        new Rook(Color.WHITE, { x: 7, y: 0 }),
        new Knight(Color.WHITE, { x: 7, y: 1 }),
        new Bishop(Color.WHITE, { x: 7, y: 2 }),
        new Queen(Color.WHITE, { x: 7, y: 3 }),
        new King(Color.WHITE, { x: 7, y: 4 }),
        new Bishop(Color.WHITE, { x: 7, y: 5 }),
        new Knight(Color.WHITE, { x: 7, y: 6 }),
        new Rook(Color.WHITE, { x: 7, y: 7 }),
      ]
    ]
  }
}