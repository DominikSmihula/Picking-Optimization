import * as cls from 'cls-hooked';
import pino from 'pino';
const namespace: any = cls.createNamespace('storage');

export class Logger {
  _logger: any;

  constructor() {
    this._logger = pino({
      timestamp: pino.stdTimeFunctions.isoTime,
      formatters: {
        level(label, number) {
          return { level: label };
        },
        bindings(binding: pino.Bindings) {
          return {};
        },
      },
    });
  }

  info(msg) {
    this._logger.info({
      traceId: cls.getNamespace('storage').get('traceId') ?? '',
      endpoint: cls.getNamespace('storage').get('endpoint') ?? '',
      message: msg.text,
      ...this.objectParser(msg.data),
    });
  }

  error(msg) {
    this._logger.error({
      traceId: cls.getNamespace('storage').get('traceId') ?? '',
      endpoint: cls.getNamespace('storage').get('endpoint') ?? '',
      message: msg.text,
      ...this.objectParser(msg.data),
    });
  }

  objectParser(data: any) {
    if (typeof data == 'string') return { data };
    else return { ...data };
  }
}
