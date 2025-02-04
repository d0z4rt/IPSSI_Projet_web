/**
 * Simulate network delay 🤌
 * @param ms - time to wait in ms
 * @returns {Promise<void>}
 */
export const wait = (ms = 1000): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms))
