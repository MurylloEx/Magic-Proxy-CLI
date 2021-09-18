import { Body, Controller, Delete, Get, Param, Post, UseFilters, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthorizeGuard } from 'src/security/guards/authorize.guard';
import { Roles as KnownRoles } from 'src/security/roles.enum';
import { Roles } from 'src/security/roles.decorator';
import { SettingsService } from 'src/services/settings.service';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import { SettingsModel } from 'src/models/settings.model';
import { MagicProxyService } from 'src/services/magic.proxy.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ResponseService } from 'src/services/response.service';

@Controller('settings')
@UseGuards(AuthorizeGuard)
@UseFilters(HttpExceptionFilter)
@UsePipes(ValidationPipe)
@ApiBearerAuth()
export class SettingsController {

  constructor(
    private settingsService: SettingsService,
    private magicProxyService: MagicProxyService,
    private response: ResponseService){}

  @Get()
  @Roles(KnownRoles.Manager)
  public async getSettings(){
    return this.response.build(await this.settingsService.findAll());
  }

  @Post()
  @Roles(KnownRoles.Manager)
  public async addSetting(@Body() data: SettingsModel){
    const response = await this.settingsService.insert(data);
    await this.magicProxyService.reloadProxy();
    return this.response.build(response);
  }

  @Delete()
  @Roles(KnownRoles.Manager)
  public async deleteSetting(@Param('id') id: string){
    await this.settingsService.remove(id);
    await this.magicProxyService.reloadProxy();
    return this.response.build();
  }

}
