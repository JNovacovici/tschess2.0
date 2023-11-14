import Board from "../ChessBoard/ChessBoard";
import ChessPiece from "./Piece";
import { Position } from "../ChessBoard/Postition";

class Knight extends ChessPiece {
  canMove(fromPosition: Position, newPosition: Position, board: Board): boolean {
    const deltaX = Math.abs(newPosition.x - fromPosition.x);
    const deltaY = Math.abs(newPosition.y - fromPosition.y);

    //Knight moves in "L" shape: either 2 horizontal then veritcal or 2 vertial and then horizontal
    if ((deltaX === 1 && deltaY === 2) || (deltaX === 2 && deltaY === 1)) {
      const pieceAtNewPosition = board.getPiece(newPosition);
      if (pieceAtNewPosition === null || pieceAtNewPosition.getColor() !== this.color) {
        return true;
      }
    }

    return false;
  }

  getWhite(): string {
    return '♘' //0x2658
  }

  getBlack(): string {
    return '♞' //0x265e
  }
}

export default Knight;