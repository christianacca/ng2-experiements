import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import '../custom-rx/pausable.operator';

@Pipe({
  name: 'pause'
})
export class PausePipe implements PipeTransform {

  transform(value: Observable<any>, pauser: Observable<boolean>): Observable<any> {
    return value.pauseReplay(pauser);
  }
}
