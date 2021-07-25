import { Controller, Get } from '@overnightjs/core';
import { Request, Response } from 'express';

@Controller('template')
export class TemplateController {
  @Get('')
  public getDefault(req: Request, res: Response): void {
    res.send([
      {
        msg: 'Hello node-template repo!',
      },
    ]);
  }
}
