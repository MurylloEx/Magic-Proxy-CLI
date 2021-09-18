import { Body, Controller, Delete, Get, Param, Post, Put, UseFilters, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import { AuthorizeGuard } from 'src/security/guards/authorize.guard';
import { Roles as KnownRoles } from 'src/security/roles.enum';
import { Roles } from 'src/security/roles.decorator';
import { UsersService } from 'src/services/users.service';
import { UserModel } from 'src/models/user.model';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('users')
@UseGuards(AuthorizeGuard)
@UseFilters(HttpExceptionFilter)
@UsePipes(ValidationPipe)
@ApiBearerAuth()
export class UsersController {

  constructor(private usersService: UsersService){}

  @Get()
  @Roles(KnownRoles.Manager)
  public async getUsers(){
    return await this.usersService.findAll();
  }

  @Post()
  @Roles(KnownRoles.Manager)
  public async createUser(@Body() data: UserModel){
    return await this.usersService.insert(data);
  }

  @Put(':id')
  @Roles(KnownRoles.Manager)
  public async updateUser(@Param('id') id: string, @Body() data: UserModel){
    return await this.usersService.updateOne(id, data);
  }

  @Delete(':id')
  @Roles(KnownRoles.Manager)
  public async deleteUser(@Param('id') id: string){
    await this.usersService.remove(id);
    return { success: true }
  }

}
