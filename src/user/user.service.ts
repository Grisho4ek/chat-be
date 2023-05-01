import { Injectable } from '@nestjs/common';
import { ManagmentApiService } from 'src/managment-api/managment-api.service';

@Injectable()
export class UserService {
  constructor(private managmentApiService: ManagmentApiService) {}

  async getUsers() {
    try {
      const client = await this.managmentApiService.getClient();
      return await client.getUsers();
    } catch (error) {
      console.log(error);
    }
  }
}
