import { UsersService } from 'src/services/users.service';
import { UserModel } from 'src/models/user.model';
import { ResponseService } from 'src/services/response.service';
export declare class UsersController {
    private usersService;
    private response;
    constructor(usersService: UsersService, response: ResponseService);
    getUsers(): Promise<any>;
    createUser(data: UserModel): Promise<any>;
    updateUser(id: string, data: UserModel): Promise<any>;
    deleteUser(id: string): Promise<any>;
}
