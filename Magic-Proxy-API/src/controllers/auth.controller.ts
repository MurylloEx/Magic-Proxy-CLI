import { Body, Controller, Post, UnauthorizedException, UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import { LoginData } from 'src/data/login.data';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import { AuthService } from 'src/services/auth.service';
import { ResponseService } from 'src/services/response.service';
import { UsersService } from 'src/services/users.service';

@Controller('auth')
@UseFilters(HttpExceptionFilter)
@UsePipes(ValidationPipe)
export class AuthController {

  constructor(
    private authService: AuthService,
    private userService: UsersService,
    private response: ResponseService){}

  @Post()
  public async doLogin(@Body() data: LoginData){
    if (!(await this.authService.checkCredentials(data.name, data.token)))
      throw new UnauthorizedException();

    const [user] = await this.userService.findByName(data.name);

    if (!user) 
      throw new UnauthorizedException();
      
    const token = await this.authService.buildToken(user);
    return this.response.build({ token, user });
  }

}
