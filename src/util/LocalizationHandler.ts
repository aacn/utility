export class LanguageHandler {
  public static langFromLocale(locale: string): string {
    try {
      // e.g. new Intl.Locale('de-DE').language === 'de'
      return new Intl.Locale(locale).language;
    } catch {
      // fallback to naive split
      return locale.split(/[-_]/)[0].toLowerCase();
    }
  }
}
