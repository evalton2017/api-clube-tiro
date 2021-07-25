import { createLogger, Logger, transports, format } from 'winston';
import path = require('path');
import fs = require('fs');
import 'winston-daily-rotate-file';
import util = require('util');

export class AppLogger {
  private static logger: Logger;
  private static logDirectory = path.join(process.cwd(), 'logs');

  private static CreateLogFolderIfNotExists() {
    if (!fs.existsSync(this.logDirectory)) {
      fs.mkdirSync(this.logDirectory);
    }
  }

  private static SetLogger() {
    const logFormat = format.printf(({ level, message, timestamp }) => {
      return `${timestamp} ${level}: ${message}`;
    });
    this.logger = createLogger({
      format: format.combine(format.json(), format.timestamp(), logFormat),
      transports: [
        new transports.Console(),
        new transports.DailyRotateFile({
          filename: path.join(AppLogger.logDirectory,'%DATE%.log'),
          datePattern: 'YYYY-MM-DD',
          maxSize: '1g',
          level: 'verbose',
        }),
      ],
      exitOnError: false,
    });
  }

  public static configureLogger() {
    this.CreateLogFolderIfNotExists();
    this.SetLogger();
  }

  private static GetValue(name: string, value: any) {
    if (typeof value === 'string') {
      return value;
    } else {
      return util.inspect(value);
    }
  }

  private static GetValueDebug(value: any) {
    if (typeof value === 'string') {
      return value;
    } else {
      return util.inspect(value, false, 4, true);
    }
  }

  public static debug(value: any) {
    this.logger.debug(this.GetValueDebug(value));
  }

  public static error(value: any) {
    this.logger.error(this.GetValueDebug(value));
  }

  public static json(value: any) {
    this.logger.error(this.GetValueDebug(value));
  }

  public static warn(value: any) {
    this.logger.warn(this.GetValue('warn', value));
  }

  public static info(value: any) {
    this.logger.info(this.GetValue('info', value));
  }
}
