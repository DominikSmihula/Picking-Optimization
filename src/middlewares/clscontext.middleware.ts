import * as cls from 'cls-hooked';
import { v4 as uuidv4 } from 'uuid';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
@Injectable()
export class ClsContextMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const namespace: any = cls.getNamespace('storage');
    namespace.run(() => {
      namespace.set('endpoint', req.originalUrl);
      namespace.set('traceId', uuidv4());
      next();
    });
  }
}
