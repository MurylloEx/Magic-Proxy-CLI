import { JwtService } from '@nestjs/jwt';
import { UserModel } from 'src/models/user.model';
import { UsersService } from './users.service';
export declare class AuthService {
    private jwtService;
    private usersService;
    constructor(jwtService: JwtService, usersService: UsersService);
    checkCredentials(name: string, token: string): Promise<boolean>;
    buildToken({ id, name, token, role }: UserModel): Promise<string>;
}
