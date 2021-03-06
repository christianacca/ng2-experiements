import { APP_INITIALIZER, Provider, InjectionToken } from '@angular/core';
import { Db } from '../../../core';
import { MOD_SYNC_INIT } from '../../../module-sync-init';

interface ReportData {
    id?: number;
    name?: string;
    lastRun?: Date;
}

export class Report {
    private static db: Db;
    id: number;
    name: string;
    lastRun?: Date;

    static init(db: Db) {
        Report.db = db;
        return () => {};
    }

    constructor(data: ReportData) {
        Object.assign(this, data);
    }
    load() {
        return Report.db.fetchEntityData<Report>(this.id, 'Report').then(data => {
            this.name = data.name || `Entity List [Id: ${this.id}]`;
            return this;
        });
    }
}

export const reportCtorInitProvider: Provider = {
    provide: MOD_SYNC_INIT,
    multi: true,
    useFactory: Report.init,
    deps: [Db]
};
