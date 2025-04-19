/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWTPayload } from 'src/common/types/jwt-payload';
import { RedisService } from 'src/common/utils/redis.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private redisService: RedisService,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: JWTPayload) {
    const user = await this.redisService.get(payload.email);
    if (!user) {
      // user cache session timed out, forced to sign in again for security and low latency
      throw new UnauthorizedException('Unauthorized');
    }
    const parsedUser = JSON.parse(user);
    return {
      email: parsedUser.email,
      userId: parsedUser.id,
      userTag: parsedUser.tag.name,
      venueId: parsedUser.venue.id,
    };
  }
}
