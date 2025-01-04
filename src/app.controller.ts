import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './modules/auth/decorators/public.decorator';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // In your NestJS app
  @Public()
  @Get('/health')
  async check() {
    return {
      status: 'ok',
      timestamp: new Date(),
    };
  }
}
