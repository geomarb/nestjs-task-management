import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async createSecureServer(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<void> {
    const { username, password } = authCredentialsDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.usersRepository.create({
      username,
      password: hashedPassword,
    });

    try {
      await this.usersRepository.save(user);
    } catch (error) {
      const DUPLICATED_USER = '23505';

      if (error.code === DUPLICATED_USER) {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async findUserByUsername(username: string) {
    return await this.usersRepository.findOne({ where: { username } });
  }
}
