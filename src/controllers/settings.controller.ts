import { Controller, Delete, Get, Param, Post, Put, UseFilters, UseGuards } from '@nestjs/common';
import { AuthorizeGuard } from 'src/security/guards/authorize.guard';
import { Roles as RequiredRoles } from 'src/security/roles.enum';
import { Roles } from 'src/security/decorators/roles.decorator';
import { SettingsService } from 'src/services/settings.service';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';

@Controller('settings')
@UseGuards(AuthorizeGuard)
@UseFilters(HttpExceptionFilter)
export class SettingsController {

  constructor(private settingsService: SettingsService){}

  @Get()
  @Roles(RequiredRoles.Manager)
  public getSettings(){
    
  }

  @Post()
  @Roles(RequiredRoles.Manager)
  public addSetting(){

  }

  @Delete()
  @Roles(RequiredRoles.Manager)
  public deleteSetting(@Param('id') id: string){

  }

}
