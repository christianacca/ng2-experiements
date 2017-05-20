import { Injectable, Provider, Injector, ReflectiveInjector, Type, InjectionToken } from '@angular/core';
import { DbServiceProviderRegistry } from './db-service-provider-registry';

export interface DataResponse<T> {
    results: T[];
    inlineCount?: number;
}

@Injectable()
export class UowService {
    injector: Injector;
    inmemoryDb: any[] = [
        { reference: this.generateFakeRef(), title: 'Monitor' }
    ];

    constructor(serviceRegistry: DbServiceProviderRegistry, parentInjector: Injector) {
        console.log('di-reg2>UowService.ctor');
        this.injector = ReflectiveInjector.fromResolvedProviders(serviceRegistry.getProviders(), parentInjector);
    }

    get<T>(token: Type<T> | InjectionToken<T>): T
    // tslint:disable-next-line:unified-signatures
    get<T>(token: any): T
    get<T>(token: any): T {
        return this.injector.get(token);
    }

    executeQuery<T>(query: any, executionOptions: any = {}): Promise<DataResponse<T>> {
        const fakeResults = {
            results: this.inmemoryDb
        };
        return new Promise<DataResponse<T>>(resolve => {
            setTimeout(() => resolve(fakeResults), 500);
        });
    }

    private generateFakeRef() {
        const result = [];
        for (let i = 0; i < 9; ++i) {
            result.push(Math.ceil(Math.random() * i));
        }
        return result.join('');
    }
}
