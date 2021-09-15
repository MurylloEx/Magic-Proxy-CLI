import { Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthorizeGuard } from 'src/security/guards/authorize.guard';

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
