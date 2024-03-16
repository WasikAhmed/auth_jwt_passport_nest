import { IsNotEmpty, Length } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'username is required' })
  @Length(8, 20, {
    message: 'username must be between 8 and 10 characters long',
  })
  username: string;

  @IsNotEmpty({ message: 'email is required' })
  email: string;

  @IsNotEmpty({ message: 'password is required' })
  @Length(8, 32, {
    message: 'password must be between 8 and 32 characters long',
  })
  password: string;
}
