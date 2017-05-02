import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportListResolve } from './report-list/report-list-resolve.service';
import { ReportListComponent } from './report-list/report-list.component';
import { reportInitializerProvider } from './report-list/report.model';

@NgModule({
    imports: [CommonModule],
    providers: [reportInitializerProvider, ReportListResolve],
    declarations: [ReportListComponent]
})
export class ReportsModule {
}

export { ReportListResolve, ReportListComponent };
