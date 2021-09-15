import { Injectable } from '@nestjs/common';
import { createProxy, ProxyConfig, ProxyTrigger } from 'magic-reverse-proxy';

@Injectable()
export class ProxyService {

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
