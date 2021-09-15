import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

@Controller('settings')
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
