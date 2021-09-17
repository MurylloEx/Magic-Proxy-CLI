import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProxyModel } from 'src/models/proxy.model';
import { Repository } from 'typeorm';

@Injectable()
export class ProxyService {

  constructor(
    @InjectRepository(ProxyModel)
    private Proxies: Repository<ProxyModel>){}

  async findAll(): Promise<ProxyModel[]> {
    return this.Proxies.find();
  }

  async findOne(id: string): Promise<ProxyModel> {
    return this.Proxies.findOne(id);
  }

  async updateOne(id: string, user: Partial<ProxyModel>): Promise<ProxyModel> {
    let found = await this.Proxies.findOne(id);
    if (!found)
      return null;
    await this.Proxies.update({id}, user);
    return this.Proxies.merge(found, user);
  }

  async insert(data: ProxyModel): Promise<ProxyModel> {
    return await this.Proxies.save(data);
  }

  async remove(id: string): Promise<void> {
    await this.Proxies.delete(id);
  }

}
