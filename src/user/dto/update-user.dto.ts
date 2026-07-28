import { PartialType } from '@nestjs/mapped-types';
import { SignupDto } from './sign-up.dto';

export class UpdateUserDto extends PartialType(SignupDto) {}
