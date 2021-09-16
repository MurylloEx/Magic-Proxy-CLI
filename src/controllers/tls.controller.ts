import { Body, Controller, Delete, Get, Param, Post, UseFilters, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { Roles as RequiredRoles } from 'src/security/roles.enum';
import { Roles } from 'src/security/decorators/roles.decorator';
import { TlsService } from 'src/services/tls.service';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import { AuthorizeGuard } from 'src/security/guards/authorize.guard';
import { TlsModel } from 'src/models/tls.model';

@Controller('tls')
@UseGuards(AuthorizeGuard)
@UseFilters(HttpExceptionFilter)
@UsePipes(ValidationPipe)
export class TlsController {

  constructor(private tlsService: TlsService){}

  @Get()
  @Roles(RequiredRoles.Manager)
  public async getTls(){
    return await this.tlsService.findAll();
  }

  @Post()
  @Roles(RequiredRoles.Manager)
  public async addTls(@Body() data: TlsModel){
    return await this.tlsService.insert(data);
  }

  @Delete(':id')
  @Roles(RequiredRoles.Manager)
  public async deleteTls(@Param('id') id: string){
    await this.tlsService.remove(id);
    return { success: true }
  }

}
