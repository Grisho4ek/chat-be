import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { ClaimsDto } from 'src/auth/dto/claims.dto';
import { Response } from 'express';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findOrCreate(claims: ClaimsDto): Promise<{
    user: User;
    status: number;
  }> {
    let user = await this.userRepository.findOneBy({ auth_id: claims.sub });

    if (!user) {
      user = this.userRepository.create({
        auth_id: claims.sub,
        email: claims.email,
        name: claims.given_name,
        family_name: claims.family_name,
        gender: claims.gender,
        birthdate: claims.birthdate,
        picture: claims.picture,
      });

      await this.userRepository.save(user);
      return {
        user,
        status: 201,
      };
    }
    return {
      user,
      status: 200,
    };
  }
}
