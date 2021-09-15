import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

@Controller('proxy')
export class ProxyController {

  @Get()
  public getProxies(){

  }

  @Post()
  public addProxy(){

  }

  @Put(':id')
  public updateProxy(@Param('id') id: string){

  }

  @Delete(':id')
  public deleteProxy(@Param('id') id: string){

  }

}
