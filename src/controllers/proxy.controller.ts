import { Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthorizeGuard } from 'src/security/guards/authorize.guard';

@Controller('proxy')
@UseGuards(AuthorizeGuard)
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
