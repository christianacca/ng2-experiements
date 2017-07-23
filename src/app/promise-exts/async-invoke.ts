import { isPromiseLike } from './is-promise-like';

export async function asyncInvoke<T>(items: T[], method: (item: T) => void | Promise<void>): Promise<void> {
  items = items || [];
  const asyncRunPromises: Promise<void>[] = [];
  for (let i = 0; i < items.length; i++) {
    const runResult = method(items[i]);
    if (isPromiseLike(runResult)) {
      asyncRunPromises.push(runResult);
    }
  }
  await Promise.all(asyncRunPromises);
}
