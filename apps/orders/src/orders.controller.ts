import { Controller, Get } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  async getHello() {
    return this.ordersService.getHello();
  }
}
