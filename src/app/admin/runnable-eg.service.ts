import { Injectable } from '@angular/core';
import { IRunnable } from '../runnable';

@Injectable()
export class RunnableEgService implements IRunnable {
  run(): void | Promise<any> {
    console.log('admin>RunnableEgService');
  }
}
