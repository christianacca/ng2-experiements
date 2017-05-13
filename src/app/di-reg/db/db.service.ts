import { Injectable, Provider } from '@angular/core';

export interface DataResponse<T> {
    results: T[];
    inlineCount?: number;
}

@Injectable()
export class DbService {

    executeQuery<T>(query: any, executionOptions: any = {}): Promise<DataResponse<T>> {
        // fake results
        return Promise.resolve({
            results: [
                { reference: '00000', title: 'Monitor' }
            ] as any[]
        });
    }
}

export const dbServiceProviders = [
    DbService
];
