import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { AppService } from './app.service';

type GetHelloBody = { name: string };

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello/:name')
  getHello(@Param('name') name: string): string {
    return `Hello ${name}`;
  }

  @Post()
  getHelloWithName(@Body() body: GetHelloBody): { greeting: string } {
    return { greeting: `Hello ${body.name}` };
  }
}
