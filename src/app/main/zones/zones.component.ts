import { AfterViewInit, ChangeDetectorRef, Component, NgZone, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-zones',
  templateUrl: './zones.component.html'
})
export class ZonesComponent implements OnInit, AfterViewInit {
  errorCount = 0;
  @ViewChild('tmpl', { read: ViewContainerRef}) container: ViewContainerRef;
  @ViewChild('tmpl') tmpl: TemplateRef<any>;

  constructor(private ngZone: NgZone, private cd: ChangeDetectorRef) {

  }

  ngOnInit() {
    this.ngZone.onError.subscribe((err) => {
      this.errorCount += 1;
      // angular won't see our change until the next change detection cycle
      // therefore we need to trigger a manual check
      this.cd.detectChanges();
    });
  }

  ngAfterViewInit() {
    this.container.createEmbeddedView(this.tmpl);
  }
}
