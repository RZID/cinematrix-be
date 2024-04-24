import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'Shhh--cinematrix999123PPPcxan',
    });
  }

  async validate(payload: any) {
    return {
      uid: payload.sub,
      role: payload.role,
      username: payload.username,
      groupId: payload.groupId,
    };
  }
}
