import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { LoginData } from 'src/data/login.data';
import { AuthorizeGuard } from 'src/security/guards/authorize.guard';
import { AuthService } from 'src/services/auth.service';

@Controller('authentication')
@UseGuards(AuthorizeGuard)
export class AuthController {

  constructor(private authService: AuthService){}

  @Post('login')
  public async doLogin(@Body() data: LoginData){
    if (!(await this.authService.checkCredentials(data.name, data.token))){
      
    }
  }

}
