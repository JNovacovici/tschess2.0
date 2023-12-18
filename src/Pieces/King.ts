import Board from "../ChessBoard/ChessBoard";
import ChessPiece, { Color } from "./Piece";
import { Position } from "../ChessBoard/Postition";
import Rook from "./Rook";

class King extends ChessPiece {

  canMove(fromPosition: Position, newPosition: Position, board: Board): boolean {
    const deltaX = Math.abs(newPosition.x - fromPosition.x);
    const deltaY = Math.abs(newPosition.y - fromPosition.y);

    if (deltaX <= 1 && deltaY <= 1) {
      const targetPiece = board.getPiece(newPosition);

      return targetPiece === null || targetPiece.getColor() !== this.getColor();
    }

    if (this.canCastle(fromPosition, newPosition, board).canCastle) {
      return true;
    }

    return false;
  }

   public canCastle(fromPosition: Position, newPosition: Position, board: Board): { rook: Rook | null; rookPosition: Position; canCastle: Boolean} {
    if (this.hasMadeFirstMove()) {
      return { rook: null, rookPosition: { x: -1, y: -1 }, canCastle: false };
    }

    //King side Castling
    if (newPosition.x === fromPosition.x + 2 && newPosition.y === fromPosition.y) {
      for (let i = fromPosition.x + 1; i <= newPosition.x; i++) {
        if (board.getPiece({ x: i, y: fromPosition.y }) !== null) {
          return { rook: null, rookPosition: { x: -1, y: -1 }, canCastle: false };
        }
      }

      const rookPosition = { x: fromPosition.x + 3, y: fromPosition.y };
      const rook = board.getPiece(rookPosition);
      if (rook instanceof Rook && !rook.hasMadeFirstMove()) {
        return { rook, rookPosition, canCastle: true };
      }
    }

    //Queen side Castling
    if (newPosition.x === fromPosition.x - 2 && newPosition.y === fromPosition.y) {
      for (let i = fromPosition.x - 1; i >= newPosition.x - 1; i--) {
        if (board.getPiece({ x: i, y: fromPosition.y }) !== null) {
          return { rook: null, rookPosition: { x: -1, y: -1 }, canCastle: false };
        }
      }

      const rookPosition = { x: fromPosition.x - 4, y: fromPosition.y };
      const rook = board.getPiece(rookPosition);
      if (rook instanceof Rook && !rook.hasMadeFirstMove()) {
        return { rook, rookPosition, canCastle: true };
      }
    }

    return { rook: null, rookPosition: { x: -1, y: -1 }, canCastle: false };
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

  isInCheck(kingPosition: Position, board: Board): boolean {
    const opponentColor = this.color === Color.WHITE ? Color.BLACK : Color.WHITE;

    // Iterate over the opponent's pieces
    for (let x = 0; x < 8; x++) {
      for (let y = 0; y < 8; y++) {
        const currentPosition: Position = { x, y };
        const piece = board.getPiece(currentPosition);

        // Check if the piece belongs to the opponent and can move to the king's position
        if (piece !== null && piece.getColor() === opponentColor) {
          const validMovesArray = piece.validMoves(currentPosition, board);

          // Check if the piece can legally move to the king's position
          if (validMovesArray[kingPosition.x][kingPosition.y] && piece.canMove(currentPosition, kingPosition, board)) {
            return true; // King is in check
          }
        }
      }
    }

    return false; // King is not in check
  }

  getWhite(): string {
    return '♔' //0x2654
  }

  getBlack(): string {
    return '♚' //0x265a
  }
}

export default King;