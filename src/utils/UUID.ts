import { randomBytes } from "crypto";

/**
 * generates a UUID of the given length
 */
export function UUID(length?: number): string {
    return randomBytes(length || 16).toString("hex");
}
