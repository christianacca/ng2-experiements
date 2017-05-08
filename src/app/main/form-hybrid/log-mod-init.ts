import { Provider, Injectable } from '@angular/core';
import { MOD_SYNC_INIT } from '../../module-sync-init';

@Injectable()
export class LogModInit {
  constructor() {
    return () => {
      console.log('form-hybrid.module>LogModInit');
    };
  }
}

export const logModInitProvider: Provider = {
  provide: MOD_SYNC_INIT,
  multi: true,
  useClass: LogModInit
};
