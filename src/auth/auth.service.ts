import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  createUser(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    return this.userRepository.createUser(authCredentialsDto);
  }

  async loginUser(authCredentialsDto: AuthCredentialsDto): Promise<Object> {
    return this.userRepository.loginUser(authCredentialsDto);
  }
}
