import { LoginData } from 'src/data/login.data';
import { AuthService } from 'src/services/auth.service';
import { ResponseService } from 'src/services/response.service';
import { UsersService } from 'src/services/users.service';
export declare class AuthController {
    private authService;
    private userService;
    private response;
    constructor(authService: AuthService, userService: UsersService, response: ResponseService);
    doLogin(data: LoginData): Promise<any>;
}
