import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderRequestDTO } from './dto/create-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  async getHello() {
    return this.ordersService.getHello();
  }

  @Post()
  async createOrder(@Body() request: CreateOrderRequestDTO) {
    return await this.ordersService.createOrder(request);
  }
  //
  @Get()
  async getOrders() {
    return await this.ordersService.getOrders();
  }
}
