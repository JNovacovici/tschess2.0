import Board from "../ChessBoard/ChessBoard";
import ChessPiece from "./Piece";
import { Position } from "../ChessBoard/Postition";

class King extends ChessPiece {
  canMove(fromPosition: Position, newPosition: Position, board: Board): boolean {
    const deltaX = Math.abs(newPosition.x - fromPosition.x);
    const deltaY = Math.abs(newPosition.y - fromPosition.y);

    return deltaX <= 1 && deltaY <= 1;
  }

  // movePiece(fromPosition: Position, newPosition: Position, board: Board): Board {
  //   if (this.canMove(fromPosition, newPosition, board)) {
  //   }
  //   return board;
  // }

  getWhite(): string {
    return '♔' //0x2654
  }

  getBlack(): string {
    return '♚' //0x265a
  }
}

export default King;