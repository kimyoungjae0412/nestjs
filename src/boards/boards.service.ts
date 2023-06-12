import { Injectable, UnauthorizedException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { BoardRepository } from './board-repository';
import { Board } from './board.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
  ) {}
  getAllBoards(): Promise<Board[]> {
    return this.boardRepository.getBoards();
  }
  getBoardById(id: number): Promise<Board> {
    return this.boardRepository.getBoardById(id);
  }

  getMyAllBoards(user: User): Promise<Board[]> {
    console.log(1);
    return this.boardRepository.getMyAllBoards(user);
  }

  createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto, user);
  }

  updateBoard(id: number, status: BoardStatus): Promise<Object> {
    return this.boardRepository.updateBoard(id, status);
  }
  deleteBoard(id: number, user: User): Promise<Object> {
    return this.boardRepository.deleteBoard(id, user);
  }
}
