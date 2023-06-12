import { IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class AuthCredentialsDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @MinLength(4)
  @Matches(/^[a-zA-Z0-9]*$/, {
    message: 'password only accepts english and number',
  })
  password: string;
}
