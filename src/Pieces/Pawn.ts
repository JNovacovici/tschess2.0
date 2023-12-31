import Board from "../ChessBoard/ChessBoard";
import ChessPiece, { Color } from "./Piece";
import { Position } from "../ChessBoard/Postition";


class Pawn extends ChessPiece {
  canMove(fromPosition: Position, newPosition: Position, board: Board): boolean {
    const deltaX = Math.abs(newPosition.x - fromPosition.x);
    const deltaY = newPosition.y - fromPosition.y;
    const direction = this.color === Color.WHITE ? -1 : 1;

    // Starting position can move 2
    //old if statement: this.color === Color.BLACK && fromPosition.y === 1 && newPosition.x === fromPosition.x
    if (deltaX === 0 && deltaY === 2 * direction && fromPosition.y === (this.color === Color.WHITE ? 6 : 1)) {
      if (board.getPiece({ x: fromPosition.x, y: fromPosition.y + direction }) === null && board.getPiece(newPosition) === null) {
        return true;
      }
    }

    // Can move up 1
    if (deltaX === 0 && deltaY === direction && board.getPiece(newPosition) === null) {
      return true;
    }

    // Can kill diagonal if opponent piece is there
    if (deltaX === 1 && deltaY === direction) {
      const pieceAtNewPosition = board.getPiece(newPosition);
      if (pieceAtNewPosition !== null && pieceAtNewPosition.getColor() !== this.color) {
        return true;
      }
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
    return '♙' //0x2659
  }

  getBlack(): string {
    return '♟' //0x265f
  }
};

export default Pawn;