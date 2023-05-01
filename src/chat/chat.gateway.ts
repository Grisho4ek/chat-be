import { Logger, UseGuards } from '@nestjs/common';
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
import { Namespace, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { JwtGuard } from 'src/auth/jwt.guard';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from 'src/auth/types';

type AuthorizedSocket = Socket & {
  user: JwtPayload;
};

const configService = new ConfigService();

@UseGuards(JwtGuard)
@WebSocketGateway({
  namespace: 'chat',
  cors: {
    origin: [configService.get('CLIENT_ORIGIN')],
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

  @SubscribeMessage('message')
  handleMessage(
    @MessageBody() data: string,
    @ConnectedSocket()
    client: AuthorizedSocket,
  ) {
    this.logger.log(data);
    this.logger.debug(`Recived message from ${client.user.sub}`);
  }

  handleConnection(client: AuthorizedSocket) {
    this.logger.debug(`Socket connected with: ${client.id}`);
    this.io.emit('hello', 'hello');
    this.logger.log(`WS Client with id:${client.id} disconnected!`);
    this.logger.debug(`Number of connected sockets: ${this.io.sockets.size}`);
  }

  handleDisconnect(client: Socket) {
    const sockets = this.io.sockets;

    this.logger.log(`WS Client with id:${client.id} disconnected!`);
    this.logger.debug(`Number of connected sockets: ${sockets.size}`);
  }
}
