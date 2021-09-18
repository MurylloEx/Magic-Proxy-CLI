import { Body, Controller, Delete, Get, Param, Post, UseFilters, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { Roles as KnownRoles } from 'src/security/roles.enum';
import { Roles } from 'src/security/roles.decorator';
import { TlsService } from 'src/services/tls.service';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import { AuthorizeGuard } from 'src/security/guards/authorize.guard';
import { TlsModel } from 'src/models/tls.model';
import { MagicProxyService } from 'src/services/magic.proxy.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ResponseService } from 'src/services/response.service';

@Controller('tls')
@UseGuards(AuthorizeGuard)
@UseFilters(HttpExceptionFilter)
@UsePipes(ValidationPipe)
@ApiBearerAuth()
export class TlsController {

  constructor(
    private tlsService: TlsService,
    private magicProxyService: MagicProxyService,
    private response: ResponseService){}

  @Get()
  @Roles(KnownRoles.Manager)
  public async getTls(){
    return this.response.build(await this.tlsService.findAll());
  }

  @Post()
  @Roles(KnownRoles.Manager)
  public async addTls(@Body() data: TlsModel){
    const response = await this.tlsService.insert(data);
    await this.magicProxyService.reloadProxy();
    return this.response.build(response);
  }

  @Delete(':id')
  @Roles(KnownRoles.Manager)
  public async deleteTls(@Param('id') id: string){
    await this.tlsService.remove(id);
    await this.magicProxyService.reloadProxy();
    return this.response.build();
  }

}
