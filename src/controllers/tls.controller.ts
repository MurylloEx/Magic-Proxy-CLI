import { Controller, Delete, Get, Param, Post } from '@nestjs/common';

@Controller('tls')
export class TlsController {

  @Get()
  public getTls(){
    
  }

  @Post()
  public addTls(){

  }

  @Delete(':id')
  public deleteTls(@Param('id') id: string){

  }

}
