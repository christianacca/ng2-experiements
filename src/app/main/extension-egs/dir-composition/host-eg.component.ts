import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-host-eg',
  template: `
    <p appHostHook>
      host-eg Works!
    </p>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HostEgComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
