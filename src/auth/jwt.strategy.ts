import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';
import { ConfigService } from '@nestjs/config';
import { Socket } from 'socket.io';
import { JwtPayload } from './types';

function isSocketRequest(req: Request | Socket): req is Socket {
  return !!(req as Socket).handshake;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(configService: ConfigService) {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${configService.get(
          'AUTH0_DOMAIN',
        )}/.well-known/jwks.json`,
      }),
      jwtFromRequest: (req: Request | Socket) => {
        return isSocketRequest(req)
          ? req.handshake.auth.token
          : ExtractJwt.fromAuthHeaderAsBearerToken()(
              req as ReturnType<
                keyof typeof ExtractJwt.fromAuthHeaderAsBearerToken
              >,
            );
      },
      audience: configService.get('AUTH0_AUDIENCE'),
      issuer: `https://${configService.get('AUTH0_DOMAIN')}/`,
      algorithms: ['RS256'],
    });
  }

  async validate(payload: JwtPayload): Promise<JwtPayload> {
    return payload;
  }
}
