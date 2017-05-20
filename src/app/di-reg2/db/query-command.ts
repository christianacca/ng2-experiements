import { Injectable, Provider } from '@angular/core';
import { UowService } from './uow.service';
import { DB_SERVICE } from './db-service-provider-registry';

@Injectable()
export class QueryCommand {
    query: any = {};
    executionOptions: any = {};
    constructor(private db: UowService) {}
    async run<T>(): Promise<T[]> {
        const response = await this.db.executeQuery<T>(this.query, this.executionOptions);
        return response.results;
    }
}
