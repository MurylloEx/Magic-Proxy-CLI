import { Body, Controller, Delete, Get, Param, Post, Put, UseFilters, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import { AuthorizeGuard } from 'src/security/guards/authorize.guard';
import { Roles as KnownRoles } from 'src/security/roles.enum';
import { Roles } from 'src/security/roles.decorator';
import { ProxyService } from 'src/services/proxy.service';
import { ProxyModel } from 'src/models/proxy.model';
import { MagicProxyService } from 'src/services/magic.proxy.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ResponseService } from 'src/services/response.service';

@Controller('proxy')
@UseGuards(AuthorizeGuard)
@UseFilters(HttpExceptionFilter)
@UsePipes(ValidationPipe)
@ApiBearerAuth()
export class ProxyController {

  constructor(
    private proxyService: ProxyService,
    private magicProxyService: MagicProxyService,
    private response: ResponseService){}

  @Get()
  @Roles(KnownRoles.Manager)
  public async getProxies(){
    return this.response.build(await this.proxyService.findAll());
  }

  @Post()
  @Roles(KnownRoles.Manager)
  public async addProxy(@Body() data: ProxyModel){
    const response = await this.proxyService.insert(data);
    await this.magicProxyService.reloadProxy();
    return this.response.build(response);
  }

  @Put(':id')
  @Roles(KnownRoles.Manager)
  public async updateProxy(@Param('id') id: string, @Body() data: ProxyModel){
    const response = await this.proxyService.updateOne(id, data);
    await this.magicProxyService.reloadProxy();
    return this.response.build(response);
  }

  @Delete(':id')
  @Roles(KnownRoles.Manager)
  public async deleteProxy(@Param('id') id: string){
    await this.proxyService.remove(id);
    await this.magicProxyService.reloadProxy();
    return this.response.build();
  }

}
