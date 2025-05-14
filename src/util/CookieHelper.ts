/**
 * Class with functions to determine if cookies should have the __Secure prefix applied or not.
 * This is determined based on if the project is running in production or not, as __Secure cookies doesn't work in
 * a dev environment.
 */
class CookieHelper {
  private static readonly cookieSecurePrefix = '__Secure-';

  private static isProduction(): boolean {
    return process.env.NODE_ENV === 'production';
  }

  /**
   * Returns the cookie name with either the secure prefix or as it was provided, based on the mode the project runs in.
   * If the project is in production, return with __Secure- prefix otherwise return as it is.
   * @param name {string} The base name of the cookie without any additional prefix.
   * @returns {string} The potentially altered cookie name.
   */
  public static getCookieName(name: string): string {
    return this.isProduction() ? this.cookieSecurePrefix + name : name;
  }
}

export { CookieHelper };
