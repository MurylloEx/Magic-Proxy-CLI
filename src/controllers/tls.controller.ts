import { Body, Controller, Delete, Get, Param, Post, UseFilters, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { Roles as KnownRoles } from 'src/security/roles.enum';
import { Roles } from 'src/security/decorators/roles.decorator';
import { TlsService } from 'src/services/tls.service';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import { AuthorizeGuard } from 'src/security/guards/authorize.guard';
import { TlsModel } from 'src/models/tls.model';
import { MagicProxyService } from 'src/services/magic.proxy.service';

@Controller('tls')
@UseGuards(AuthorizeGuard)
@UseFilters(HttpExceptionFilter)
@UsePipes(ValidationPipe)
export class TlsController {

  constructor(
    private tlsService: TlsService,
    private magicProxyService: MagicProxyService){}

  @Get()
  @Roles(KnownRoles.Manager)
  public async getTls(){
    return await this.tlsService.findAll();
  }

  @Post()
  @Roles(KnownRoles.Manager)
  public async addTls(@Body() data: TlsModel){
    const response = await this.tlsService.insert(data);
    await this.magicProxyService.reloadProxy();
    return response;
  }

  @Delete(':id')
  @Roles(KnownRoles.Manager)
  public async deleteTls(@Param('id') id: string){
    await this.tlsService.remove(id);
    await this.magicProxyService.reloadProxy();
    return { success: true }
  }

}
