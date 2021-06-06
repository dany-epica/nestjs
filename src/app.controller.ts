import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/ping')
  ping(): string {
    return this.appService.getPong();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/secure_ping')
  securePing(): string {
    return this.appService.getSecurePong();
  }
}
