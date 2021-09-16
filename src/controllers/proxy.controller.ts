import { Body, Controller, Delete, Get, Param, Post, Put, UseFilters, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import { AuthorizeGuard } from 'src/security/guards/authorize.guard';
import { Roles as KnownRoles } from 'src/security/roles.enum';
import { Roles } from 'src/security/decorators/roles.decorator';
import { ProxyService } from 'src/services/proxy.service';
import { ProxyModel } from 'src/models/proxy.model';

@Controller('proxy')
@UseGuards(AuthorizeGuard)
@UseFilters(HttpExceptionFilter)
@UsePipes(ValidationPipe)
export class ProxyController {

  constructor(private proxyService: ProxyService){}

  @Get()
  @Roles(KnownRoles.Manager)
  public async getProxies(){
    return await this.proxyService.findAll();
  }

  @Post()
  @Roles(KnownRoles.Manager)
  public async addProxy(@Body() data: ProxyModel){
    return await this.proxyService.insert(data);
  }

  @Put(':id')
  @Roles(KnownRoles.Manager)
  public async updateProxy(@Param('id') id: string, @Body() data: ProxyModel){
    return await this.proxyService.updateOne(id, data);
  }

  @Delete(':id')
  @Roles(KnownRoles.Manager)
  public async deleteProxy(@Param('id') id: string){
    await this.proxyService.remove(id);
    return { success: true }
  }

}
