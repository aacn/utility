import stc from 'string-to-color';

export class InfoFormatter {
  static getName(
    firstName: string | undefined | null,
    lastName: string | undefined | null,
    email?: string | null
  ): string {
    if (firstName && lastName) {
      return `${firstName} ${lastName}`;
    }

    if (firstName) {
      return firstName;
    }

    if (lastName) {
      return lastName;
    }

    if (email) {
      return email;
    }

    return 'Nutzer';
  }

  static getEmail(email: string | null) {
    if (email) {
      return email;
    }
    return;
  }

  static getLetter(name: string | null | undefined): string | null {
    if (!name) return null;
    return name.charAt(0).toUpperCase();
  }

  static getBackgroundColor(email: string | undefined | null): string {
    return stc(email);
  }

  static getInitial(name: string): string {
    return name.slice(0, 1).toUpperCase();
  }
}
