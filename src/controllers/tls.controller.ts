import { Controller, Delete, Get, Param, Post, UseFilters, UseGuards } from '@nestjs/common';
import { Roles as RequiredRoles } from 'src/security/roles.enum';
import { Roles } from 'src/security/decorators/roles.decorator';
import { TlsService } from 'src/services/tls.service';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import { AuthorizeGuard } from 'src/security/guards/authorize.guard';

@Controller('tls')
@UseGuards(AuthorizeGuard)
@UseFilters(HttpExceptionFilter)
export class TlsController {

  constructor(private tlsService: TlsService){}

  @Get()
  @Roles(RequiredRoles.Manager)
  public getTls(){
    
  }

  @Post()
  @Roles(RequiredRoles.Manager)
  public addTls(){

  }

  @Delete(':id')
  @Roles(RequiredRoles.Manager)
  public deleteTls(@Param('id') id: string){

  }

}
