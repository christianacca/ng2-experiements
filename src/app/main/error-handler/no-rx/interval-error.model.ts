import { failRandomly } from './fail-randomly';

export interface IntervalErrorModelData {
  frequency: number;
}

export class IntervalErrorModel implements IntervalErrorModelData {
  frequency: number;
  results = 0;
  private intervalSubscription: any;
  private isDisposed = false;

  constructor({ frequency }: IntervalErrorModelData) {
    this.frequency = frequency || 1000;
  }

  dispose() {
    if (!this.intervalSubscription) {
      return;
    }
    clearInterval(this.intervalSubscription);
  }

  start() {
    if (this.intervalSubscription || this.isDisposed) { return; }

    this.startWorkOnInterval(this.frequency);
  }

  private startWorkOnInterval(frequency: number) {
    this.intervalSubscription = setInterval(async () => {
      // errors thrown by `failRandomly` will be sent to global exception handler automatically
      this.results = await failRandomly();
    }, frequency);
  }
}
