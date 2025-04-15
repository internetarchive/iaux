/**
 * Asynchronously pause execution for a given number of milliseconds.
 *
 * Used for waiting for some asynchronous updates.
 *
 * Usage:
 * await promisedSleep(100)
 *
 * @export
 * @param {number} ms
 * @returns {Promise<void>}
 */
export function promisedSleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
