import { Controller, Body, Post, UseGuards, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { ClaimsDto } from 'src/auth/dto/claims.dto';
import { UserService } from './user.service';
import { User } from './user.entity';
import { Response } from 'express';

@ApiTags('users')
@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('me')
  @ApiOkResponse({ type: User, status: 200 })
  @ApiCreatedResponse({ type: User, status: 201 })
  async getMe(@Body() dto: ClaimsDto, @Res() res: Response) {
    const { user, status } = await this.userService.findOrCreate(dto);
    res.status(status).send(user);
  }
}
