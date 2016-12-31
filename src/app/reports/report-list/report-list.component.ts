import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { Report } from './report.model';

interface RouteData {
  reports: Report[]
}

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css']
})
export class ReportListComponent implements OnInit {
  reports: Report[];
  constructor(route: ActivatedRoute) {
    this.reports = (route.snapshot.data as RouteData).reports;
  }

  ngOnInit() {
  }

}
