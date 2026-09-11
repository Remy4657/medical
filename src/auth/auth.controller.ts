import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { CurrentUserId } from './current-user.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '../common/guards/auth.guard';
import { User } from './entities/user.entity';

@Controller('api/v1/users')
@UseGuards(AuthGuard)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Patch('profile')
  async updateProfile(
    @CurrentUserId() userId: string,
    @Body() dto: UpdateUserDto,
  ) {
    return this.authService.updateProfile(userId, dto);
  }
  @Get('profile')
  async getMyProfile(@CurrentUserId() userId: string) {
    return this.authService.getMyProfile(userId);
  }
}
