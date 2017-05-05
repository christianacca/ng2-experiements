import { NgModule, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportListResolve } from './report-list/report-list-resolve.service';
import { ReportListComponent } from './report-list/report-list.component';
import { reportCtorInitProvider } from './report-list/report.model';
import { SYNC_INIT } from '../../shared';

@NgModule({
    imports: [CommonModule],
    providers: [reportCtorInitProvider, ReportListResolve],
    declarations: [ReportListComponent]
})
export class ReportsModule {
    constructor(@Inject(SYNC_INIT) inits: Function[]) {
        inits.forEach(f => f());
    }
}

export { ReportListResolve, ReportListComponent };
