import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { Report } from './report.model';

interface RouteData {
  reports: Report[];
}

@Component({
  selector: 'app-report-list',
  template: `
    <p>
      report-list works!
    </p>
    <ul>
      <li *ngFor="let report of reports">{{report.name }}</li>
    </ul>
  `
})
export class ReportListComponent implements OnInit {
  reports: Report[];
  constructor(route: ActivatedRoute) {
    this.reports = (route.snapshot.data as RouteData).reports;
  }

  ngOnInit() {
  }

}
