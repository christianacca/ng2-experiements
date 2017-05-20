import { Injectable, Provider } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/toPromise';

export interface DataResponse<T> {
    results: T[];
    inlineCount?: number;
}

@Injectable()
export class DbService {
    inmemoryDb: any[] = [
        { reference: this.generateFakeRef(), title: 'Monitor' }
    ];

    executeQuery<T>(query: any, executionOptions: any = {}): Promise<DataResponse<T>> {
        const fakeResults = {
            results: this.inmemoryDb
        };
        return Observable.of(fakeResults).delay(500).toPromise();
    }

    private generateFakeRef() {
        const result = [];
        for (let i = 0; i < 9; ++i) {
            result.push(Math.ceil(Math.random() * i));
        }
        return result.join('');
    }
}
