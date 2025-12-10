type LogLevel = 'log' | 'warn' | 'error';

interface LogFn {
  (message?: any, ...optionalParams: any[]): void;
}

export interface Logger {
  log: LogFn;
  warn: LogFn;
  error: LogFn;

  dev: LogFn;
  debug: LogFn;

  disable(): void;
  enable(): void;
}

const LOG_LEVEL: LogLevel = 'log';

const NO_OP: LogFn = (_message?: any, ..._optionalParams: any[]) => undefined;

class ConsoleLogger implements Logger {
  readonly log: LogFn;
  readonly warn: LogFn;
  readonly error: LogFn;

  readonly dev: LogFn;
  readonly debug: LogFn;

  constructor(options?: { level?: LogLevel }) {
    const { level } = options || {};

    this.error = console.error.bind(console);
    this.warn = NO_OP;
    this.log = NO_OP;

    switch (level) {
      case 'warn':
        this.warn = console.warn.bind(console);
        break;
      case 'log':
        this.warn = console.warn.bind(console);
        this.log = console.log.bind(console);
        break;
    }

    this.dev =
      process.env.NODE_ENV === 'development'
        ? console.log.bind(console)
        : NO_OP;

    this.debug = process.env.DEBUG === '1' ? console.log.bind(console) : NO_OP;
  }

  disable() {
    Object.defineProperty(this, 'error', { value: NO_OP });
    Object.defineProperty(this, 'warn', { value: NO_OP });
    Object.defineProperty(this, 'log', { value: NO_OP });
    Object.defineProperty(this, 'dev', { value: NO_OP });
    Object.defineProperty(this, 'debug', { value: NO_OP });
  }

  enable() {
    Object.defineProperty(this, 'error', {
      value: console.error.bind(console),
    });
    Object.defineProperty(this, 'warn', {
      value:
        LOG_LEVEL === 'warn' || LOG_LEVEL === 'log'
          ? console.warn.bind(console)
          : NO_OP,
    });
    Object.defineProperty(this, 'log', {
      value: LOG_LEVEL === 'log' ? console.log.bind(console) : NO_OP,
    });
    Object.defineProperty(this, 'dev', {
      value:
        process.env.NODE_ENV === 'development'
          ? console.log.bind(console)
          : NO_OP,
    });
    Object.defineProperty(this, 'debug', {
      value: process.env.DEBUG === '1' ? console.log.bind(console) : NO_OP,
    });
  }
}

export const logger = new ConsoleLogger({ level: LOG_LEVEL });
