import { isPromiseLike } from './is-promise-like';


export async function asyncInvoke<T>(
  items: T[],
  method: ((item: T) => void | Promise<void>) | string): Promise<void> {

  items = items || [];
  const fn = typeof method === 'function' ? method : (item: T) => item[method]();
  const asyncRunPromises: Promise<void>[] = [];
  for (let i = 0; i < items.length; i++) {
    const runResult = fn(items[i]);
    if (isPromiseLike(runResult)) {
      asyncRunPromises.push(runResult);
    }
  }
  await Promise.all(asyncRunPromises);
}
