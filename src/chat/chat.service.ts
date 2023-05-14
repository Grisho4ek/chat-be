import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from 'src/entitites/Message';
import { Repository } from 'typeorm';
import { MessageDto } from './dto';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Message) private messageRepository: Repository<Message>,
  ) {}

  async getMessages(user_id: string) {
    return await this.messageRepository.find({
      where: [
        {
          user_id,
        },
        {
          to: user_id,
        },
      ],
    });
  }

  async createMessage(dto: MessageDto) {
    const message = this.messageRepository.create(dto);
    return await this.messageRepository.save(message);
  }
}
