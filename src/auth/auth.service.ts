import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthenticationClient } from 'auth0';

@Injectable()
export class AuthService {
  private authClient: AuthenticationClient;

  constructor(private configService: ConfigService) {
    this.authClient = new AuthenticationClient({
      domain: configService.get('AUTH0_DOMAIN'),
      clientId: configService.get('AUTH0_CLIENT_ID'),
      clientSecret: configService.get('AUTH0_SECRET'),
    });
  }

  async getManagmentAPIToken() {
    const { access_token } = await this.authClient.clientCredentialsGrant({
      audience: `https://${this.configService.get('AUTH0_DOMAIN')}/api/v2/`,
      scope: 'read:users',
    });
    return access_token;
  }
}
