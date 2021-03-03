export default class In {
    constructor(public readonly timeout: number, public readonly on: () => void, public readonly off: () => void) {}

    private timer: number | boolean = false; // false => init, number => sched, true => started

    /** start sets up the timer and fires on() unless stop() is called */
    public start(): void {
        if (this.timer !== false) return;
        this.timer = (setTimeout(() => {
            this.timer = true;
            this.on();
        }, this.timeout) as unknown) as number;
    }

    /** stop cancels the timer, or calls off() if it has already fired */
    public stop(): void {
        if (this.timer === false) return;

        if (this.timer === true) {
            this.off();
            this.timer = false;
            return;
        }

        // timer was running, but didn't fire
        clearTimeout(this.timer);
        this.timer = false;
    }
}
