import { UserModel } from 'src/models/user.model';
import { Repository } from 'typeorm';
export declare class UsersService {
    private Users;
    constructor(Users: Repository<UserModel>);
    findByName(name: string): Promise<UserModel[]>;
    findAll(): Promise<UserModel[]>;
    findOne(id: string): Promise<UserModel>;
    updateOne(id: string, user: Partial<UserModel>): Promise<UserModel>;
    insert(user: UserModel): Promise<UserModel>;
    remove(id: string): Promise<void>;
}
