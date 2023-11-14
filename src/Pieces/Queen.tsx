import Board from "../ChessBoard/ChessBoard";
import ChessPiece from "./Piece";
import { Position } from "../ChessBoard/Postition";

class Queen extends ChessPiece {
  canMove(fromPosition: Position, newPosition: Position, board: Board): boolean {
    const deltaX = Math.abs(newPosition.x - fromPosition.x);
    const deltaY = Math.abs(newPosition.y - fromPosition.y);

    if ((deltaX !== 0 && deltaY === 0) || (deltaX === 0 && deltaY !== 0) || deltaX === deltaY) {
      const xDirection = deltaX === 0 ? 0 : (newPosition.x > fromPosition.x ? 1 : -1);
      const yDirection = deltaY === 0 ? 0 : (newPosition.y > fromPosition.y ? 1 : -1);

      let x = fromPosition.x + xDirection;
      let y = fromPosition.y + yDirection;

      while (x !== newPosition.x || y !== newPosition.y) {
        if (board.getPiece({ x, y }) !== null) {
          return false;
        }
        x += xDirection;
        y += yDirection;
      }

      const pieceAtNewPosition = board.getPiece(newPosition);
      if (pieceAtNewPosition === null || pieceAtNewPosition.getColor() !== this.color) {
        return true;
      }
    }

    return false;
  }

  getWhite(): string {
    return '♕' //0x2655
  }

  getBlack(): string {
    return '♛' //0x265b
  }
}

export default Queen;