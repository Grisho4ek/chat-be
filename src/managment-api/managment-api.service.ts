import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ManagementClient } from 'auth0';
import { AuthService } from 'src/auth/auth.service';
import * as jwt from 'jsonwebtoken';
import { JwtPayload } from 'src/auth/types';

@Injectable()
export class ManagmentApiService {
  private client: ManagementClient;
  private token: string;

  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {
    this.authService.getManagmentAPIToken().then((token) => {
      this.token = token;
      this.client = new ManagementClient({
        token,
        domain: this.configService.get('AUTH0_DOMAIN'),
      });
    });
  }

  async getClient() {
    const payload = jwt.decode(this.token) as JwtPayload;
    if (Date.now() >= payload.exp * 1000) {
      this.token = await this.authService.getManagmentAPIToken();
      this.client = new ManagementClient({
        token: this.token,
        domain: this.configService.get('AUTH0_DOMAIN'),
      });
    }

    return this.client;
  }
}
