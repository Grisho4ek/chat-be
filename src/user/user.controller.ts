import { Controller, UseGuards, Get } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiProperty } from '@nestjs/swagger';
import { UserService } from './user.service';
import { JwtGuard } from '../auth/jwt.guard';
import { AppMetadata, User as IUser, Identity, UserMetadata } from 'auth0';

class User implements IUser {
  @ApiProperty()
  email: string;
  @ApiProperty({ required: false })
  email_verified?: boolean | undefined;
  @ApiProperty({ required: false })
  username?: string | undefined;
  @ApiProperty({ required: false })
  phone_number?: string | undefined;
  @ApiProperty({ required: false })
  phone_verified?: boolean | undefined;
  @ApiProperty()
  user_id: string;
  @ApiProperty({ required: false })
  _id?: string | undefined;
  @ApiProperty({ required: false })
  created_at?: string | undefined;
  @ApiProperty({ required: false })
  updated_at?: string | undefined;
  @ApiProperty({ required: false })
  identities?: Identity[] | undefined;
  @ApiProperty({ required: false })
  app_metadata?: AppMetadata | undefined;
  @ApiProperty({ required: false })
  user_metadata?: UserMetadata | undefined;
  @ApiProperty({ required: false })
  picture?: string | undefined;
  @ApiProperty({ required: false })
  name?: string | undefined;
  @ApiProperty({ required: false })
  nickname: string | undefined;
  @ApiProperty({ required: false })
  multifactor?: string[] | undefined;
  @ApiProperty({ required: false })
  last_ip?: string | undefined;
  @ApiProperty({ required: false })
  last_login?: string | undefined;
  @ApiProperty({ required: false })
  last_password_reset?: string | undefined;
  @ApiProperty({ required: false })
  logins_count?: number | undefined;
  @ApiProperty({ required: false })
  blocked?: boolean | undefined;
  @ApiProperty({ required: false })
  given_name?: string | undefined;
  @ApiProperty({ required: false })
  family_name?: string | undefined;
}

@ApiTags('users')
@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @ApiOkResponse({
    type: [User],
    status: 200,
  })
  async getUsers() {
    return await this.userService.getUsers();
  }
}
