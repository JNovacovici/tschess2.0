import Board from "../ChessBoard/ChessBoard";
import { Position } from "../ChessBoard/Postition";

export enum Color {
  WHITE = 'white',
  BLACK = 'black'
}

abstract class ChessPiece {

  constructor(protected color: Color) {}

  abstract canMove(fromPosition: Position, newPosition: Position, board: Board): boolean;

  abstract getWhite(): string;
  abstract getBlack(): string;

  getColor(): Color {
    return this.color;
  }

  getUnicode(): string {
    return this.color === Color.WHITE ? this.getWhite() : this.getBlack();
  }

}

export default ChessPiece;