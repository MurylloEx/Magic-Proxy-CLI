import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from 'src/models/user.model';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(UserModel)
    private Users: Repository<UserModel>){}

  async findByName(name: string): Promise<UserModel[]> {
    return this.Users.find({name});
  }
  
  async findAll(): Promise<UserModel[]> {
    return this.Users.find();
  }

  async findOne(id: string): Promise<UserModel> {
    return this.Users.findOne(id);
  }

  async updateOne(id: string, user: Partial<UserModel>): Promise<UserModel> {
    let found = await this.Users.findOne(id);
    if (!found)
      return null;
    await this.Users.update({id}, user);
    return this.Users.merge(found, user);
  }

  async insert(user: UserModel): Promise<UserModel> {
    return await this.Users.save(user);
  }

  async remove(id: string): Promise<void> {
    await this.Users.delete(id);
  }

}
