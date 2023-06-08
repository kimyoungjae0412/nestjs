import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './boards.model';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
  private boards: Board[] = [];

  getAllBoards(): Board[] {
    return this.boards;
  }

  getBoardById(id: string): Board {
    return this.boards.find((board) => board.id === id);
  }

  createBoard(createBoardDto: CreateBoardDto) {
    const {title, description} = createBoardDto;
    const board: Board = {
      id: uuid(),
      title: title,
      description: description,
      boardStatus: BoardStatus.PUBLIC,
    };

    this.boards.push(board);
    return board;
  }

  updateBoard(id: string, status: BoardStatus): Board {
    const board = this.getBoardById(id);
    board.boardStatus = status;
    return board;
  }

  deleteBoard(id: string): void {
    this.boards = this.boards.filter((board) => board.id !== id);
  }
}
