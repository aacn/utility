export class DateFormatter {
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
      timezone: string;
      locale: string | undefined;
    }
  ) => {
    const timezone = options.timezone;

    return new Date(dateString).toLocaleDateString(options.locale, {
      weekday: 'long',
      timeZone: timezone,
    });
  };

  static getZoneAdjustedDate = (
    dateString: string,
    options: {
      timezone: string;
      locale: string | undefined;
    }
  ) => {
    const timezone = options.timezone;

    return new Date(dateString).toLocaleDateString(options.locale, {
      month: 'long',
      day: 'numeric',
      timeZone: timezone,
    });
  };

  static getZoneAdjustedTime = (
    dateString: string,
    options: {
      timezone: string;
      locale: string | undefined;
    }
  ) => {
    const timezone = options.timezone;

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
