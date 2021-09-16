import { Body, Controller, Post, UnauthorizedException, UseFilters } from '@nestjs/common';
import { LoginData } from 'src/data/login.data';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import { AuthService } from 'src/services/auth.service';
import { UsersService } from 'src/services/users.service';

@Controller('authentication')
@UseFilters(HttpExceptionFilter)
export class AuthController {

  constructor(
    private authService: AuthService,
    private userService: UsersService){}

  @Post('login')
  public async doLogin(@Body() data: LoginData){
    if (await this.authService.checkCredentials(data.name, data.token)){
      const [user] = await this.userService.findByName(data.name);
      if (!!user){
        const token = await this.authService.buildToken(user);
        return { token, user }
      }
    }
    throw new UnauthorizedException();
  }

}
