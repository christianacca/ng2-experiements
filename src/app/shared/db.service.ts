import { Injectable } from '@angular/core';

@Injectable()
export class Db {
    fetchEntityData<T>(id: number, type: string) {
        return Promise.resolve({ } as T);
    }
}