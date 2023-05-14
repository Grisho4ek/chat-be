import { Logger, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import {
  WebSocketGateway,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Namespace } from 'socket.io';
import { ChatService } from './chat.service';
import { JwtGuard } from 'src/auth/jwt.guard';
import { ConfigService } from '@nestjs/config';
import { MessageDto } from './dto';
import { GetUser } from 'src/decorators';

const configService = new ConfigService();

@UseGuards(JwtGuard)
@WebSocketGateway({
  namespace: 'chat',
  cors: {
    origin: configService
      .get('CLIENT_ORIGINS')
      .split(',')
      .map((v: string) => v.trim()),
  },
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private readonly logger = new Logger(ChatGateway.name);
  constructor(private chatService: ChatService) {}

  @WebSocketServer()
  io: Namespace;

  afterInit(): void {
    this.logger.log(`Websocket Gateway initialized.`);
  }

  @UsePipes(
    new ValidationPipe({
      whitelist: true,
    }),
  )
  @SubscribeMessage('message')
  handleMessage(@MessageBody() data: MessageDto, @GetUser('sub') user_id) {
    console.log('user_id', user_id);
    this.chatService
      .createMessage({ ...data, to: data.to || 'all' })
      .then((msg) => {
        if (msg.to === 'all') {
          return this.io.emit('message', msg);
        }
        this.io.to(user_id).emit('message', msg);
        this.io.to(msg.to).emit('message', msg);
      })
      .catch((err) => {
        this.logger.error(err);
      });
  }

  @SubscribeMessage('init')
  handleInit(@ConnectedSocket() socket, @GetUser('sub') user_id) {
    socket.join(user_id);
  }

  handleConnection(@ConnectedSocket() socket) {
    this.logger.debug(`Socket connected with: ${socket.id}`);
  }

  handleDisconnect(@ConnectedSocket() socket) {
    this.logger.debug(`Socket disconnected: ${socket.id}`);
  }
}
