import {
  IsEmail,
  IsHash,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UserDTO {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsOptional()
  displayName?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsHash('sha256')
  passwordHash: string;
}

export interface IUser {
  username: string;
  displayName?: string;
  email?: string;
  passwordHash: string;
}
