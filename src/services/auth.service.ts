import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserModel } from 'src/models/user.model';
import { UsersService } from './users.service';

@Injectable()
export class AuthService {

  constructor(
    private jwtService: JwtService,
    private usersService: UsersService){}

  public async checkCredentials(name: string, token: string){
    let found = await this.usersService.findByName(name);
    if (!!found[0] && (found[0].token == token))
      return true;
    return false;
  } 

  public async buildToken(user: UserModel){
    return this.jwtService.signAsync({
      id: user.id,
      name: user.name,
      token: user.token,
      role: user.role
    });
  }

  

}
