import { Controller, Delete, Get, Param, Put, UseGuards } from '@nestjs/common';
import { Roles } from 'src/security/decorators/roles.decorator';
import { AuthorizeGuard } from 'src/security/guards/authorize.guard';

@Controller('users')
@UseGuards(AuthorizeGuard)
export class UsersController {

  @Get()
  @Roles('admin')
  public getUsers(){
    return { hi: 'hi' }
  }

  @Put(':id')
  public updateUser(@Param('id') id: string){

  }

  @Delete(':id')
  public deleteUser(@Param('id') id: string){

  }

}
