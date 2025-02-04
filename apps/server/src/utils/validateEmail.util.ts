/**
 * Check if an email follows RFC 5322
 * @see http://www.regular-expressions.info/email.html
 * @param {string} string
 * @returns
 */
export const validateEmail = (string: string) => {
  // see: http://www.regular-expressions.info/email.html
  const regex =
    /[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/

  return regex.test(string)
}
