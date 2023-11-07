import ChessPiece from "./Pieces/Piece";

class Board  {
  public pieces: ChessPiece[][];

  constructor(pieces: ChessPiece[][]) {
    this.pieces = pieces;
  }

}

export default Board;