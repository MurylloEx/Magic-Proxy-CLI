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
    let [user] = await this.usersService.findByName(name);
    return (!!user && (user.token == token));
  } 

  public async buildToken({id, name, token, role}: UserModel){
    return this.jwtService.signAsync({id, name, token, role});
  }

}
