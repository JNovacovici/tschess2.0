interface Position {
  x: number;
  y: number;
}

abstract class ChessPiece {
  protected position: Position;
  protected color: string;

  constructor(color: string, initialX: number, initialY: number) {
    this.color = color;
    this.position = { x: initialX, y: initialY}
  }

  abstract move(newPosition: Position): boolean;

  getCurrentPosition(): Position {
    return this.position;
  }

  setPosition(newPosition: Position): void {
    this.position = newPosition;
  }

  getColor(): string {
    return this.color;
  }
}

export default ChessPiece;