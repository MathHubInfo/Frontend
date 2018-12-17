/**
 * @file Implements utility functions used for Promises
 */


/**
 * Runs a promise with a timeout
 * @param promise Promise to run
 * @param timeout timout to generate
 */
export async function withTimeout<T>(promise: () => Promise<T>, timeout: number) {
    if (timeout < 0) throw new Error("negative timeout not allowed");
    if (timeout === 0) return promise();

    return Promise.race<T>([
        new Promise<never>((rs, rj) => setTimeout(() => rj(new Error("Timeout")), timeout)),
        promise(),
    ]);
}

/**
 * Delays a promise by a given amount of seconds
 * @param promise Promise to delay
 * @param timeout Amount of milliseconds to delay promise for
 */
export async function delay<T>(promise: Promise<T>, timeout: number): Promise<T> {
    return promise.then(
        async (r: T) => new Promise<T>((resolve, reject) => (
            setTimeout(() => resolve(r), timeout)
        )),
        async (r: {}) => new Promise<T>((resolve, reject) => (
            setTimeout(() => reject(r), timeout)
        )),
    );
}

/**
 * Rejects a promise after a given amount of time
 * @param promise Generates a new Promise that is always rejected after a given amount of tiome
 * @param timeout Timeout in Milliseconds after which to reject promise
 * @param reason Reason to reject promise for
 */
export async function rejectAfter<T, S>(promise: Promise<T>, timeout: number, reason?: S): Promise<T> {
    await promise;

    return new Promise<T>((resolve, reject) => (
        setTimeout(() => reject(reason), timeout)
    ));
}

export interface ICanncelablePromise<T> {
    promise: Promise<T>;
    cancel(): void;
}
/**
 * Makes a promise cancellable.
 * Adpoted from https://reactjs.org/blog/2015/12/16/ismounted-antipattern.html
 * @param promise promise to wrap
 */
export function makeCancelable<T>(promise: Promise<T>): ICanncelablePromise<T> {
    let hasCanceled = false;

    const wrappedPromise = new Promise<T>((resolve, reject) => {
      promise.then(
        val => hasCanceled ? reject({isCanceled: true}) : resolve(val),
        error => hasCanceled ? reject({isCanceled: true}) : reject(error),
      );
    });

    return {
      promise: wrappedPromise,
      cancel() {
        hasCanceled = true;
      },
    };
}
