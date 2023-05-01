import { Module } from '@nestjs/common';
import { ManagmentApiService } from './managment-api.service';
import { AuthService } from 'src/auth/auth.service';

@Module({
  providers: [ManagmentApiService, AuthService],
  exports: [ManagmentApiService],
})
export class ManagmentApiModule {}
