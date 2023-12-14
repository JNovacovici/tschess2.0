import Board from "../ChessBoard/ChessBoard";
import ChessPiece from "./Piece";
import { Position } from "../ChessBoard/Postition";

class Bishop extends ChessPiece {
  canMove(fromPosition: Position, newPosition: Position, board: Board): boolean {
    const deltaX = Math.abs(newPosition.x - fromPosition.x);
    const deltaY = Math.abs(newPosition.y - fromPosition.y);

    //edgecase for bishop trying to be moved illegally
    if (deltaX !== deltaY || deltaX + deltaY === 0) {
      return false;
    }

    const xDirection = newPosition.x > fromPosition.x ? 1 : -1;
    const yDirection = newPosition.y > fromPosition.y ? 1 : -1;
    let x = fromPosition.x + xDirection;
    let y = fromPosition.y + yDirection;

    //Check for piece along the newPosition path
    while (x !== newPosition.x) {
      if (board.getPiece({ x, y }) !== null) {
        return false; // piece blocking the path
      }
      x += xDirection;
      y+= yDirection;
    }

    const pieceAtNewPosition = board.getPiece(newPosition);
    if (pieceAtNewPosition === null || pieceAtNewPosition.getColor() !== this.color) {
      return true;
    }

    return false;
  }

  validMoves(fromPosition: Position, board: Board): boolean[][] {
    const validMoveArray = Array.from({ length: 8 }, () => Array(8).fill(false));

    for (let x = 0; x < 8; x++) {
      for (let y = 0; y < 8; y++) {
        const newPosition: Position = { x, y };
        validMoveArray[y][x] = this.canMove(fromPosition, newPosition, board)
      }
    }
    return validMoveArray;
  }

  getWhite(): string {
    return '♗' //0x2657
  }

  getBlack(): string {
    return '♝' //0x265d
  }
}

export default Bishop;