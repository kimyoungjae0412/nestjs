import { DataSource, IsNull, Repository } from 'typeorm';
import { Board } from './board.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatus } from './board-status.enum';
import { User } from 'src/auth/user.entity';

@Injectable()
export class BoardRepository extends Repository<Board> {
  constructor(dataSource: DataSource) {
    super(Board, dataSource.createEntityManager());
  }

  async getBoards(): Promise<Board[]> {
    const result = await this.find();
    return result;
  }

  async getBoardById(id: number): Promise<Board> {
    const result = await this.findOne({
      where: {
        id: id,
        deletedAt: IsNull(),
      },
    });
    if (!result) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }
    return result;
  }

  async getMyAllBoards(user: User): Promise<Board[]> {
    const query = this.createQueryBuilder('board');

    query.where('board.userId = :userId', { userId: user.id });

    const results = await query.getMany();

    return results;
  }

  async createBoard(
    createBoardDto: CreateBoardDto,
    user: User,
  ): Promise<Board> {
    const { title, description } = createBoardDto;

    const board = this.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
      deletedAt: null,
      user,
    });

    await this.save(board);

    return board;
  }

  async updateBoard(id: number, status: BoardStatus): Promise<Object> {
    const board = await this.getBoardById(id);

    await this.update(board.id, { status });

    const message: string = '정상적으로 업데이트 되었습니다.';

    return { message };
  }

  async deleteBoard(id: number, user: User): Promise<Object> {
    const result = await this.softDelete({
      id,
      user: {
        id: user.id,
      },
      deletedAt: IsNull(),
    });
    if (result.affected === 0) {
      throw new NotFoundException(`Can't delete Board with id ${id}`);
    }
    const message: string = '정상적으로 삭제되었습니다.';
    return message;
  }
}
