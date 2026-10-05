import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import config from 'src/config/env.config';

export interface JwtPayload {
  sub: string;
  role?: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.JWT.JWT_SECRET_KEY,
    });
  }

  // The returned object is attached to request.user
  validate(payload: JwtPayload) {
    return { id: payload.sub, role: payload.role };
  }
}
