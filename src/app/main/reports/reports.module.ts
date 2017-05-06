import { NgModule, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportListResolve } from './report-list/report-list-resolve.service';
import { ReportListComponent } from './report-list/report-list.component';
import { reportCtorInitProvider } from './report-list/report.model';
import { SharedModule } from '../../shared';

@NgModule({
    imports: [
        CommonModule,
        SharedModule.forChild()
    ],
    providers: [reportCtorInitProvider, ReportListResolve],
    declarations: [ReportListComponent]
})
export class ReportsModule {}

export { ReportListResolve, ReportListComponent };
