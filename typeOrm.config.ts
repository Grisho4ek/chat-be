import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { User } from './src/user/user.entity';

config();

const configService = new ConfigService();

export const ormConfig: DataSourceOptions = {
  type: 'postgres',
  database: configService.get('DB_NAME'),
  password: configService.get('DB_PASSWORD'),
  username: configService.get('DB_USER'),
  port: configService.get('DB_PORT'),
  host: configService.get('DB_HOST'),
  entities: [User],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  synchronize: true,
};

export default new DataSource(ormConfig);
