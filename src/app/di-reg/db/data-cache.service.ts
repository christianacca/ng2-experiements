import { Injectable, Provider } from '@angular/core';

@Injectable()
export class DataCacheService {
    private cache: { [key: string]: any } = {};
    get(key: string) {
        return this.cache[key];
    }
    set(key: string, value: any) {
        this.cache[key] = value;
    }
}
