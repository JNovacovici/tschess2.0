import Board from '../Board';

export interface Position {
  x: number;
  y: number;
}

export enum Color {
  WHITE = 'white',
  BLACK = 'black'
}

abstract class ChessPiece {
  protected position: Position;
  protected color: Color;

  constructor(color: Color, position: Position) {
    this.color = color;
    this.position = position;
  }

  abstract canMove(newPosition: Position, board: Board): boolean;
  abstract movePiece(newPosition: Position, board: Board): Board;

  getCurrentPosition(): Position {
    return this.position;
  }

  setPosition(newPosition: Position): void {
    this.position = newPosition;
  }

  getColor(): Color {
    return this.color;
  }

  abstract getWhite(): string;
  abstract getBlack(): string;
}

export default ChessPiece;