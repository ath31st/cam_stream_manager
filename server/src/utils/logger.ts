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

  static log(message: string) {
    const timestamp = this.getTimestamp();
    console.log(
      `${this.colors.log}[${timestamp}] ${message}${this.resetColor}`,
    );
  }

  static error(message: string) {
    const timestamp = this.getTimestamp();
    console.error(
      `${this.colors.error}[${timestamp}] ERROR: ${message}${this.resetColor}`,
    );
  }

  static warn(message: string) {
    const timestamp = this.getTimestamp();
    console.warn(
      `${this.colors.warn}[${timestamp}] WARNING: ${message}${this.resetColor}`,
    );
  }

  static info(message: string) {
    const timestamp = this.getTimestamp();
    console.info(
      `${this.colors.info}[${timestamp}] INFO: ${message}${this.resetColor}`,
    );
  }
}
