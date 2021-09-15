import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TlsModel } from 'src/models/tls.model';
import { Repository } from 'typeorm';

@Injectable()
export class TlsService {

  constructor(
    @InjectRepository(TlsModel)
    private Tls: Repository<TlsModel>){}

}
