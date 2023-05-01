import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ormConfig } from '../typeOrm.config';
import { ChatModule } from './chat/chat.module';
import { ManagmentApiModule } from './managment-api/managment-api.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      ...ormConfig,
    }),
    UserModule,
    AuthModule,
    ChatModule,
    ManagmentApiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
