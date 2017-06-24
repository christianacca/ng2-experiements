import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import '../custom-rx/pausable.operator';

@Pipe({
  name: 'pausable'
})
export class PausablePipe implements PipeTransform {

  transform(value: Observable<any>, pauser: Observable<boolean>): Observable<any> {
    return value.pauseReplay(pauser);
  }
}
