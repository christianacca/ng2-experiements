import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Report } from './report.model';

@Injectable()
export class ReportListResolve implements Resolve<Report[]> {
    constructor() {

    }
    resolve() {
        console.log('ReportListResolve');
        return Promise.all([
            new Report({ id: 1 }).load(),
            new Report({ id: 2 }).load()
        ]);
    }
}
