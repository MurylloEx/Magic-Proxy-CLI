import { Controller, Delete, Get, Param, Put } from '@nestjs/common';

@Controller('users')
export class UsersController {

  @Get()
  public getProxies(){
    
  }

  @Put(':id')
  public updateProxy(@Param('id') id: string){

  }

  @Delete(':id')
  public deleteProxy(@Param('id') id: string){

  }

}
