import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/jwt.guard';
import { ChatService } from './chat.service';
import { GetUser } from 'src/decorators';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Message } from 'src/entitites/Message';

@ApiTags('chat')
@UseGuards(JwtGuard)
@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Get('messages')
  @ApiOkResponse({
    type: [Message],
    status: 200,
  })
  getMessages(@GetUser('sub') sub: string) {
    return this.chatService.getMessages(sub);
  }
}
