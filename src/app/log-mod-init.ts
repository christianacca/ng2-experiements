import { Provider } from '@angular/core';
import { MOD_SYNC_INIT } from './module-sync-init';

export function logModInit() {
  return () => {
    console.log('app.module>logModInit');
  };
}
export const logModInitProvider: Provider = {
    provide: MOD_SYNC_INIT,
    multi: true,
    useFactory: logModInit
};
