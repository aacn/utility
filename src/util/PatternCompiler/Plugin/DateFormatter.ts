export class DateFormatter {
  /**
   * Safely converts date-like values into a valid Date object.
   * Returns null when the input is empty or invalid.
   */
  static toDate(value: Date | string | null | undefined): Date | null {
    if (!value) {
      return null;
    }

    if (value instanceof Date) {
      return Number.isNaN(value.getTime()) ? null : value;
    }

    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  }

  /**
   * Safely converts a date-string into a timestamp.
   */
  static toTimestamp(value: string | null | undefined): number | null {
    if (!value) {
      return null;
    }

    const parsed = new Date(value);
    const time = parsed.getTime();
    return Number.isNaN(time) ? null : time;
  }

  /**
   * Formats a date with time in German format
   * @param date Date object or date string to format
   * @returns Formatted date string
   * @example
   * // Returns "14.08.2025, 15:30"
   * DateFormatter.format(new Date('2025-08-14T15:30:00'))
   */
  static format(date: Date | string): string {
    let validDate: Date;

    if (typeof date === 'string') {
      validDate = new Date(date);
    } else {
      validDate = date;
    }

    return new Intl.DateTimeFormat('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(validDate);
  }

  /**
   * Formats a date in formal German format without time
   * @param date Date object or date string to format
   * @returns Formatted date string
   * @example
   * // Returns "14.08.2025"
   * DateFormatter.formatFormal(new Date('2025-08-14T15:30:00'))
   */
  static formatFormal(date: Date | string): string {
    let validDate: Date;

    if (typeof date === 'string') {
      validDate = new Date(date);
    } else if (date instanceof Date) {
      validDate = date;
    } else {
      //throw new RangeError('Invalid time value: ' + date);
      return `INVALID ${date}`;
    }

    return new Intl.DateTimeFormat('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(validDate);
  }

  /**
   * Formats a date in German format with full month name
   * @param date Date object or date string to format
   * @returns Formatted date string
   * @example
   * // Returns "14. August 2025"
   * DateFormatter.formatMini(new Date('2025-08-14T15:30:00'))
   */
  static formatMini(date: Date | string): string {
    let validDate: Date;

    if (typeof date === 'string') {
      validDate = new Date(date);
    } else if (date instanceof Date) {
      validDate = date;
    } else {
      throw new RangeError('Invalid time value: ' + date);
    }

    return new Intl.DateTimeFormat('de-DE', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(validDate);
  }

  static getZoneAdjustedWeekday = (
    dateString: string,
    options: {
      timezone: string | undefined;
      locale: string | undefined;
    },
    defaultTimeZone: string = 'Europe/Berlin'
  ) => {
    const timezone = options.timezone ?? defaultTimeZone;

    return new Date(dateString).toLocaleDateString(options.locale, {
      weekday: 'long',
      timeZone: timezone,
    });
  };

  static getZoneAdjustedDate = (
    dateString: string,
    options: {
      timezone: string | undefined;
      locale: string | undefined;
    },
    defaultTimeZone: string = 'Europe/Berlin'
  ) => {
    const timezone = options.timezone ?? defaultTimeZone;

    return new Date(dateString).toLocaleDateString(options.locale, {
      month: 'long',
      day: 'numeric',
      timeZone: timezone,
    });
  };

  static getZoneAdjustedTime = (
    dateString: string,
    options: {
      timezone: string | undefined;
      locale: string | undefined;
    },
    defaultTimeZone: string = 'Europe/Berlin'
  ) => {
    const timezone = options.timezone ?? defaultTimeZone;

    return new Date(dateString)
      .toLocaleTimeString(options.locale, {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: timezone,
      })
      .replace(/^0/, '');
  };
}
