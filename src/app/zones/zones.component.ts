import { Component, OnInit, NgZone, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-zones',
  templateUrl: './zones.component.html',
  styleUrls: ['./zones.component.css']
})
export class ZonesComponent implements OnInit {
  errorCount = 0;

  constructor(private ngZone: NgZone, private cd: ChangeDetectorRef) {

  }

  ngOnInit() {
    // WARNING: This first error that our throwing-child generates is not received;
    // on a quick inspection, it looks like our subscription is happening late
    // ie our subscribe call below is being made after the first error
    this.ngZone.onError.subscribe(() => {
      this.errorCount += 1;
      // angular won't see our change until the next change detection cycle
      // therefore we need to trigger a manual check
      this.cd.detectChanges();
    });
  }

}
