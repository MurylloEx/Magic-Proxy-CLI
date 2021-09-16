import { Controller, Delete, Get, Param, Post, Put, UseFilters, UseGuards } from '@nestjs/common';
import { AuthorizeGuard } from 'src/security/guards/authorize.guard';
import { Roles as RequiredRoles } from 'src/security/roles.enum';
import { Roles } from 'src/security/decorators/roles.decorator';
import { ProxyService } from 'src/services/proxy.service';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';

@Controller('proxy')
@UseGuards(AuthorizeGuard)
@UseFilters(HttpExceptionFilter)
export class ProxyController {

  constructor(private proxyService: ProxyService){}

  @Get()
  @Roles(RequiredRoles.Manager)
  public getProxies(){
    
  }

  @Post()
  @Roles(RequiredRoles.Manager)
  public addProxy(){

  }

  @Put(':id')
  @Roles(RequiredRoles.Manager)
  public updateProxy(@Param('id') id: string){

  }

  @Delete(':id')
  @Roles(RequiredRoles.Manager)
  public deleteProxy(@Param('id') id: string){

  }

}
