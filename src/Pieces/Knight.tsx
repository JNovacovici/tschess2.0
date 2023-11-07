import Board from "../Board";
import ChessPiece, { Position } from "./Piece";

class Knight extends ChessPiece {
  canMove(newPosition: Position): boolean {
    return true;
  }

  movePiece(newPosition: Position, board: Board): Board {
    if (this.canMove(newPosition)) {
      this.setPosition(newPosition);
      board.pieces
    }
    return board;
  }

  getWhite(): string {
    return '♘' //0x2658
  }

  getBlack(): string {
    return '♞' //0x265e
  }
}

export default Knight;