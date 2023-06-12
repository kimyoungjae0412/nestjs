import {
  BaseEntity,
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BoardStatus } from './board-status.enum';
import { User } from 'src/auth/user.entity';

@Entity()
export class Board extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: BoardStatus;

  @DeleteDateColumn()
  deletedAt: null | Date;

  @ManyToOne((type) => User, (user) => user.boards, { eager: false })
  user: User;
}
