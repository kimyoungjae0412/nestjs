import { Repository, DataSource } from 'typeorm';
import { User } from './user.entity';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthCredentialsDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(dataSource: DataSource, private jwtService: JwtService) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    try {
      const { username, password } = authCredentialsDto;

      const salt = await bcrypt.genSalt();

      const hashedPassword = await bcrypt.hash(password, salt);

      const user = this.create({ username, password: hashedPassword });

      await this.save(user);

      return user;
    } catch (e) {
      if (e.code === '23505') {
        throw new ConflictException('Existing username');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async loginUser(authCredentialsDto: AuthCredentialsDto): Promise<Object> {
    const { username, password } = authCredentialsDto;
    const user = await this.findOne({
      where: {
        username,
      },
    });
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { id: user.id };

      const accessToken = this.jwtService.sign(payload);
      return { username, accessToken };
    } else {
      throw new UnauthorizedException('아이디 또는 비밀번호를 확인해주세요');
    }
  }
}
