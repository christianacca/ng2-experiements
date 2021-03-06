import { Injectable, Provider } from '@angular/core';
import { DbService } from './db.service';

@Injectable()
export class QueryCommand {
    query: any = {};
    executionOptions: any = {};
    constructor(private db: DbService) {}
    async run<T>(): Promise<T[]> {
        const response = await this.db.executeQuery<T>(this.query, this.executionOptions);
        return response.results;
    }
}
