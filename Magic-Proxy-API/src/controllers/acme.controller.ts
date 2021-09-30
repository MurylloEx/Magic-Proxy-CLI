import { Body, Controller, Get, Param, ParseIntPipe, Post, UseFilters, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AcmeRequestData } from 'src/data/acme-request.data';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import { AuthorizeGuard } from 'src/security/guards/authorize.guard';
import { Roles } from 'src/security/roles.decorator';
import { AcmeService } from 'src/services/acme.service';
import { ResponseService } from 'src/services/response.service';
import { Roles as Permissions } from 'src/security/roles.enum';
import { TimeoutInterceptor } from 'src/interceptors/timeout.interceptor';

@Controller('acme')
@ApiBearerAuth()
@UseGuards(AuthorizeGuard)
@UseFilters(HttpExceptionFilter)
@UseInterceptors(TimeoutInterceptor)
@UsePipes(new ValidationPipe({ transform: true }))
export class AcmeController {

  constructor(
    private acmeService: AcmeService,
    private responseService: ResponseService){}

  @Post('request')
  @Roles(Permissions.Manager)
  async requestCertificate(@Body() data: AcmeRequestData){
    let acmeRequest = await this.acmeService.createRequest(data);
    return this.responseService.build(acmeRequest, false);
  }

  @Get('request/:id/complete')
  @Roles(Permissions.Manager)
  async completeRequest(@Param('id', ParseIntPipe) requestId: number){
    let success = await this.acmeService.completeChallenges(requestId);
    return this.responseService.build({}, !success);
  }

  @Get('request/:id/certificate')
  @Roles(Permissions.Manager)
  async getCertificate(@Param('id', ParseIntPipe) requestId: number){
    let certificate = await this.acmeService.getCertificates(requestId);
    return this.responseService.build(certificate, false);
  }

}
