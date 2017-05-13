import { Injectable } from '@angular/core';

@Injectable()
export class ChildComponentLevelService {
  value = Math.ceil(Math.random() * 100);
  constructor() {
    console.log('ChildComponentLevelService.ctor');
  }
}
