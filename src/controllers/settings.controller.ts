import { Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthorizeGuard } from 'src/security/guards/authorize.guard';

@Controller('settings')
@UseGuards(AuthorizeGuard)
export class SettingsController {

  @Get()
  public getSettings(){
    
  }

  @Post()
  public addSetting(){

  }

  @Delete()
  public deleteSetting(@Param('id') id: string){

  }

}
