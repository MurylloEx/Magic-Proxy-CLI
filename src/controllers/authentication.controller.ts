import { Body, Controller, Post } from '@nestjs/common';
import { LoginData } from 'src/data/login.data';

@Controller('authentication')
export class AuthenticationController {

  @Post('login')
  public doLogin(@Body() data: LoginData){

  }

}
