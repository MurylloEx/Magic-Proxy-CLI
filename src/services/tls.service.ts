import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TlsModel } from 'src/models/tls.model';
import { Repository } from 'typeorm';

@Injectable()
export class TlsService {

  constructor(
    @InjectRepository(TlsModel)
    private Tls: Repository<TlsModel>) { }

  async findAll(): Promise<TlsModel[]> {
    return this.Tls.find();
  }

  async findOne(id: string): Promise<TlsModel> {
    return this.Tls.findOne(id);
  }

  async findLast(): Promise<TlsModel>{
    return this.Tls.findOne({ 
      order: { timestamp: 'DESC' } 
    });
  }

  async updateOne(id: string, user: Partial<TlsModel>): Promise<TlsModel> {
    let found = await this.Tls.findOne(id);
    if (!found)
      return null;
    await this.Tls.update({ id }, user);
    return this.Tls.merge(found, user);
  }

  async insert(data: TlsModel): Promise<TlsModel> {
    return await this.Tls.save(data);
  }

  async remove(id: string): Promise<void> {
    await this.Tls.delete(id);
  }
}
