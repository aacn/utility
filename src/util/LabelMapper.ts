export class LabelMapper {
  /**
   * Integer label formatter with suffix and fallback.
   */
  static intLabel(v: unknown, suffix: string, fallback = '–'): string {
    if (typeof v !== 'number' || !Number.isFinite(v)) return fallback;
    return `${new Intl.NumberFormat('de-DE').format(v)}${suffix}`;
  }
}
