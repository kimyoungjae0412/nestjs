import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board } from './board.entity';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('boards')
export class BoardsController {
  private logger = new Logger('BoardsController');
  constructor(private boardsService: BoardsService) {}

  @Get('/')
  @UseGuards(AuthGuard())
  getAllBoards(): Promise<Board[]> {
    return this.boardsService.getAllBoards();
  }

  @Get('/:id')
  getBoardById(@Param('id', ParseIntPipe) id: number): Promise<Board> {
    return this.boardsService.getBoardById(id);
  }

  @Get('/m/y')
  @UseGuards(AuthGuard())
  getMyAllBoards(@GetUser() user: User): Promise<Board[]> {
    this.logger.verbose(`User ${user.username} trying to get all boards`);
    return this.boardsService.getMyAllBoards(user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard())
  createBoard(
    @Body() createBoardDto: CreateBoardDto,
    @GetUser() user: User,
  ): Promise<Board> {
    return this.boardsService.createBoard(createBoardDto, user);
  }

  @Put('/:id/status')
  updateBoard(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ): Promise<Object> {
    return this.boardsService.updateBoard(id, status);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  deleteBoard(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<Object> {
    return this.boardsService.deleteBoard(id, user);
  }
}
