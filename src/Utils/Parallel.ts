// Something which runs at most maxRequests promises at parallel
export default class Parallel {
    constructor(public maxRequests: number) {}

    private readonly q: Array<() => Promise<void>> = [];
    private currentRequests = 0;

    // Schedules a promise to run
    async run<T>(task: () => Promise<T>): Promise<T> {
        return new Promise<T>(async (resolve, reject) => {
            try {
                await this.runTask(async () => {
                    try {
                        resolve(await task());
                    } catch (e) {
                        reject(e);
                    }
                });
            } catch (e) {}
        });
    }

    private async runTask(task: () => Promise<void>) {
        // if we have too many things running, simply q the task
        if (this.currentRequests >= this.maxRequests)
            this.q.push(task);
        else
            try {
                // if we do not have too many things running
                // run the current task
                this.currentRequests += 1;
                await task();
                this.currentRequests -= 1;
            } finally {
                // and run another one (if we need to)
                const next = this.q.shift();
                if (next !== undefined)
                    setImmediate(async () => this.runTask(next));
            }
    }
}
