import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersRepository } from './users.repository';
import { JwtPayload } from './jwt-payload.interface';
import { User } from './user.entity';
import { ConfigService } from '@nestjs/config';
import { AuthConfig } from '../config/interfaces/auth.config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(UsersRepository) private usersRepository: UsersRepository,
    private configService: ConfigService,
  ) {
    const authConfig = configService.get<AuthConfig>('auth');

    super({
      secretOrKey: authConfig.secret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { username } = payload;

    const user: User = await this.usersRepository.findUserByUsername(username);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
