/** @file Implements utility functions used for Promises  */

/**
 * Delays a promise by a given amount of seconds
 * @param promise Promise to delay
 * @param timeout Amount of milliseconds to delay promise for
 */
export function delay<T>(promise: Promise<T>, timeout: number): Promise<T> {
    return promise.then(
        (r: T) => new Promise<T>((resolve, reject) => (
            window.setTimeout(() => resolve(r), timeout)
        )),
        (r: any) => new Promise<T>((resolve, reject) => (
            window.setTimeout(() => reject(r), timeout)
        )),
    );
}

/**
 * Rejects a promise after a given amount of time
 * @param promise Generates a new Promise that is always rejected after a given amount of tiome
 * @param timeout Timeout in Milliseconds after which to reject promise
 * @param reason Reason to reject promise for
 */
export function rejectAfter<T>(promise: Promise<T>, timeout: number, reason?: any): Promise<T> {
    return promise.then((r: T) => new Promise<T>((resolve, reject) => (
        window.setTimeout(() => reject(reason), timeout)
    )));
}

export interface ICanncelablePromise<T> {
    promise: Promise<T>;
    cancel: () => void;
}
/**
 * Makes a promise cancellable.
 * Adpoted from https://reactjs.org/blog/2015/12/16/ismounted-antipattern.html
 * @param promise promise to wrap
 */
export function makeCancelable<T>(promise: Promise<T>): ICanncelablePromise<T> {
    let hasCanceled: boolean = false;

    const wrappedPromise = new Promise<T>((resolve, reject) => {
      promise.then(
        (val) => hasCanceled ? reject({isCanceled: true}) : resolve(val),
        (error) => hasCanceled ? reject({isCanceled: true}) : reject(error),
      );
    });

    return {
      promise: wrappedPromise,
      cancel() {
        hasCanceled = true;
      },
    };
}
