import { failRandomly } from './fail-randomly';

interface Record {
  successCount: number;
  failureCount: number
}

export interface IntervalCountedErrorModelData {
  frequency: number;
}

export class IntervalCountedErrorModel implements IntervalCountedErrorModelData {
  frequency: number;
  results = { successCount: 0, failureCount: 0 };
  private intervalSubscription: any;
  private isDisposed = false;

  constructor({ frequency }: IntervalCountedErrorModelData) {
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

  private async recorded(state: Record, source: () => Promise<any>) {
    try {
      await source();
      state.successCount += 1;
    } catch (error) {
      state.failureCount += 1;
      // throw to ensure error is NOT silently swallowed but sent to global exception handler
      throw error;
    }
  }

  private startWorkOnInterval(frequency: number) {
    this.intervalSubscription = setInterval(
      () => this.recorded(this.results, failRandomly)
      , frequency);
  }
}
