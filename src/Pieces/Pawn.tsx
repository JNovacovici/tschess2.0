import Board from "../Board";
import ChessPiece, { Position } from "./Piece";

class Pawn extends ChessPiece {
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
    return '♙' //0x2659
  }

  getBlack(): string {
    return '♟' //0x265f
  }
};

export default Pawn;