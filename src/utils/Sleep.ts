/**
 * A promise that does nothing for a given amount of time
 * @param time Time to wait
 */
export default async function Sleep(time?: number): Promise<void> {
    return new Promise<void>((rs: () => void, _) => setTimeout(rs, time || 1000));
}
