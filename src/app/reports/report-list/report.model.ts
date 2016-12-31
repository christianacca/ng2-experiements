import { APP_INITIALIZER, Provider } from '@angular/core';
import { Db } from '../../shared/db.service';

interface ReportData {
    id?: number;
    name?: string;
    lastRun?: Date;
}

export class Report {
    id: number;
    name: string;
    lastRun?: Date;
    constructor(data: ReportData) {
        Object.assign(this, data);
    }
    load() {
        return Report.db.fetchEntityData<Report>(this.id, 'Report').then(data => {
            this.name = data.name || `Entity List [Id: ${this.id}]`;
            return this;
        });
    }

    private static db: Db;
    static init(db: Db) {
        Report.db = db;
        return () => {};
    }
}

export const reportInitializerProvider: Provider = {
    provide: APP_INITIALIZER,
    multi: true,
    useFactory: Report.init,
    deps: [Db]
};