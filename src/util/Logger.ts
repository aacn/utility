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
const LOG_STACKS = process.env.LOG_STACKS === '1';

const NO_OP: LogFn = (_message?: any, ..._optionalParams: any[]) => undefined;

const serializeArg = (arg: any) => {
  if (arg instanceof Error) {
    if (LOG_STACKS) return arg;
    const data: Record<string, unknown> = {
      name: arg.name,
      message: arg.message,
    };
    if ((arg as any).code !== undefined) data.code = (arg as any).code;
    return data;
  }
  return arg;
};

const wrap = (fn: LogFn): LogFn => {
  return (message?: any, ...optionalParams: any[]) => {
    fn(serializeArg(message), ...optionalParams.map(serializeArg));
  };
};

class ConsoleLogger implements Logger {
  readonly log: LogFn;
  readonly warn: LogFn;
  readonly error: LogFn;

  readonly dev: LogFn;
  readonly debug: LogFn;

  constructor(options?: { level?: LogLevel }) {
    const { level } = options || {};

    this.error = wrap(console.error.bind(console));
    this.warn = NO_OP;
    this.log = NO_OP;

    switch (level) {
      case 'warn':
        this.warn = wrap(console.warn.bind(console));
        break;
      case 'log':
        this.warn = wrap(console.warn.bind(console));
        this.log = wrap(console.log.bind(console));
        break;
    }

    this.dev =
      process.env.NODE_ENV === 'development'
        ? wrap(console.log.bind(console))
        : NO_OP;

    this.debug =
      process.env.DEBUG === '1' ? wrap(console.log.bind(console)) : NO_OP;
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
      value: wrap(console.error.bind(console)),
    });
    Object.defineProperty(this, 'warn', {
      value:
        LOG_LEVEL === 'warn' || LOG_LEVEL === 'log'
          ? wrap(console.warn.bind(console))
          : NO_OP,
    });
    Object.defineProperty(this, 'log', {
      value: LOG_LEVEL === 'log' ? wrap(console.log.bind(console)) : NO_OP,
    });
    Object.defineProperty(this, 'dev', {
      value:
        process.env.NODE_ENV === 'development'
          ? wrap(console.log.bind(console))
          : NO_OP,
    });
    Object.defineProperty(this, 'debug', {
      value:
        process.env.DEBUG === '1' ? wrap(console.log.bind(console)) : NO_OP,
    });
  }
}

export const logger = new ConsoleLogger({ level: LOG_LEVEL });
