import { Controller, Delete, Get, Param, Put, UseFilters, UseGuards } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import { AuthorizeGuard } from 'src/security/guards/authorize.guard';
import { Roles as RequiredRoles } from 'src/security/roles.enum';
import { Roles } from 'src/security/decorators/roles.decorator';
import { UsersService } from 'src/services/users.service';

@Controller('users')
@UseGuards(AuthorizeGuard)
@UseFilters(HttpExceptionFilter)
export class UsersController {

  constructor(private usersService: UsersService){}

  @Get()
  @Roles(RequiredRoles.Manager)
  public getUsers(){
    return { hi: 'hi' }
  }

  @Put(':id')
  @Roles(RequiredRoles.Manager)
  public updateUser(@Param('id') id: string){

  }

  @Delete(':id')
  @Roles(RequiredRoles.Manager)
  public deleteUser(@Param('id') id: string){

  }

}
