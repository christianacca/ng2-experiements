/**
 * Determine if the argument is shaped like a Promise
 */
export function isPromiseLike(obj: any): obj is Promise<any> {
  // allow any Promise/A+ compliant thenable.
  // It's up to the caller to ensure that obj.then conforms to the spec
  return !!obj && typeof obj.then === 'function';
}

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

export function delay(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms))
}
