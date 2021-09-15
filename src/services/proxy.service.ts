import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createProxy, ProxyConfig, ProxyTrigger } from 'magic-reverse-proxy';
import { ProxyModel } from 'src/models/proxy.model';
import { Repository } from 'typeorm';

@Injectable()
export class ProxyService {

  constructor(
    @InjectRepository(ProxyModel)
    private Proxies: Repository<ProxyModel>){}

  public buildProxy(options: ProxyConfig): ProxyTrigger {
    return createProxy(options);
  }

  public bindProxy(trigger: ProxyTrigger){
    trigger.bind();
  }

  public unbindProxy(trigger: ProxyTrigger){
    trigger.unbind();
  }

}
