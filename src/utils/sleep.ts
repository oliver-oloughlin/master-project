/**
 * Sleep for a given amount of milliseconds.
 * 
 * @param n 
 */
export async function sleep(ms: number) {
  await new Promise((r) => setTimeout(r, ms))
}
