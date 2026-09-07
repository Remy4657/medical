import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async updateProfile(userId: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException('Không tìm thấy người dùng');
    }

    /**
     * Chỉ update những field được phép
     */
    if (updateUserDto.name !== undefined) {
      user.name = updateUserDto.name.trim();
    }

    if (updateUserDto.gender !== undefined) {
      user.gender = updateUserDto.gender;
    }

    if (updateUserDto.birthday !== undefined) {
      user.birthday = updateUserDto.birthday;
    }

    const updatedUser = await this.userRepository.save(user);

    return {
      name: updatedUser.name,
      gender: updatedUser.gender,
      birthday: updatedUser.birthday,
    };
  }
}
