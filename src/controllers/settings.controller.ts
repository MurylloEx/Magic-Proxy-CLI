import { Body, Controller, Delete, Get, Param, Post, UseFilters, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthorizeGuard } from 'src/security/guards/authorize.guard';
import { Roles as KnownRoles } from 'src/security/roles.enum';
import { Roles } from 'src/security/decorators/roles.decorator';
import { SettingsService } from 'src/services/settings.service';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import { SettingsModel } from 'src/models/settings.model';
import { MagicProxyService } from 'src/services/magic.proxy.service';

@Controller('settings')
@UseGuards(AuthorizeGuard)
@UseFilters(HttpExceptionFilter)
@UsePipes(ValidationPipe)
export class SettingsController {

  constructor(
    private settingsService: SettingsService,
    private magicProxyService: MagicProxyService){}

  @Get()
  @Roles(KnownRoles.Manager)
  public async getSettings(){
    return await this.settingsService.findAll();
  }

  @Post()
  @Roles(KnownRoles.Manager)
  public async addSetting(@Body() data: SettingsModel){
    const response = await this.settingsService.insert(data);
    await this.magicProxyService.reloadProxy();
    return response;
  }

  @Delete()
  @Roles(KnownRoles.Manager)
  public async deleteSetting(@Param('id') id: string){
    await this.settingsService.remove(id);
    await this.magicProxyService.reloadProxy();
    return { success: true }
  }

}
