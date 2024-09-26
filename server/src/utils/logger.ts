// src/utils/logger.ts
export class Logger {
  private static getTimestamp(): string {
    return new Date().toISOString().slice(0, 19).replace('T', ' ');
  }

  private static resetColor = '\x1b[0m';

  private static colors = {
    error: '\x1b[31m', // red
    warn: '\x1b[33m', // yellow
    info: '\x1b[36m', // blue
    log: '\x1b[32m', // green
  };

  private static formatError(error: unknown): string {
    if (error instanceof Error) {
      return `${error.message}\n${error.stack}`;
    }
    return String(error);
  }

  static log(...args: unknown[]) {
    const timestamp = this.getTimestamp();
    console.log(`${this.colors.log}[${timestamp}]`, ...args, this.resetColor);
  }

  static error(...args: unknown[]) {
    const timestamp = this.getTimestamp();
    const formattedArgs = args.map((arg) =>
      arg instanceof Error ? this.formatError(arg) : arg,
    );
    console.error(
      `${this.colors.error}[${timestamp}] ERROR:`,
      ...formattedArgs,
      this.resetColor,
    );
  }

  static warn(...args: unknown[]) {
    const timestamp = this.getTimestamp();
    console.warn(
      `${this.colors.warn}[${timestamp}] WARNING:`,
      ...args,
      this.resetColor,
    );
  }

  static info(...args: unknown[]) {
    const timestamp = this.getTimestamp();
    console.info(
      `${this.colors.info}[${timestamp}] INFO:`,
      ...args,
      this.resetColor,
    );
  }
}
