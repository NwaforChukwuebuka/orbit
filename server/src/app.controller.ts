import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

import { RootData } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  root(): any {
    const data: RootData = this.appService.root();
    return {
      message: 'Welcome!',
      data,
    };
  }
}
