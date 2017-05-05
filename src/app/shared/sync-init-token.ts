import { InjectionToken } from '@angular/core';

export type InitFunc = () => void;

export const SYNC_INIT = new InjectionToken<InitFunc>('ctorInit');
