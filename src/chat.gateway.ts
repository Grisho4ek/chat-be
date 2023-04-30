import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway {
  @WebSocketServer()
  server;

  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: string) {
    this.server.emit('message', message);
  }
}
