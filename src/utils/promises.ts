/**
 * Delays a promise by a given amount of seconds
 * @param promise Promise to delay
 * @param timeout Amount of milliseconds to delay promise for
 */
export function delay<T>(promise: Promise<T>, timeout: number): Promise<T> {
    return promise.then(
        (r: T) => new Promise<T>(function(resolve, reject){
            window.setTimeout(() => resolve(r), timeout);
        }), 
        (r: any) => new Promise<T>(function(resolve, reject){
            window.setTimeout(() => reject(r), timeout);
        }), 
    );
}

/**
 * Rejects a promise after a given amount of time
 * @param promise Generates a new Promise that is always rejected after a given amount of tiome
 * @param timeout Timeout in Milliseconds after which to reject promise
 * @param reason Reason to reject promise for
 */
export function rejectAfter<T>(promise: Promise<T>, timeout: number, reason?: any): Promise<T> {
    return promise.then((r: T) => new Promise<T>(function(resolve, reject){
        window.setTimeout(() => reject(reason), timeout);
    }));
}
