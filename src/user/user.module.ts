import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ManagmentApiModule } from 'src/managment-api/managment-api.module';

@Module({
  imports: [ManagmentApiModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
