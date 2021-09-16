import { Body, Controller, Delete, Get, Param, Post, UseFilters, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthorizeGuard } from 'src/security/guards/authorize.guard';
import { Roles as RequiredRoles } from 'src/security/roles.enum';
import { Roles } from 'src/security/decorators/roles.decorator';
import { SettingsService } from 'src/services/settings.service';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import { SettingsModel } from 'src/models/settings.model';

@Controller('settings')
@UseGuards(AuthorizeGuard)
@UseFilters(HttpExceptionFilter)
@UsePipes(ValidationPipe)
export class SettingsController {

  constructor(private settingsService: SettingsService){}

  @Get()
  @Roles(RequiredRoles.Manager)
  public async getSettings(){
    return await this.settingsService.findAll();
  }

  @Post()
  @Roles(RequiredRoles.Manager)
  public async addSetting(@Body() data: SettingsModel){
    return await this.settingsService.insert(data);
  }

  @Delete()
  @Roles(RequiredRoles.Manager)
  public async deleteSetting(@Param('id') id: string){
    await this.settingsService.remove(id);
    return { success: true }
  }

}
