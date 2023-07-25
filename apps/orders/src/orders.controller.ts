import { Body, Controller, Get, Post, UseGuards, Req } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderRequestDTO } from './dto/create-order.dto';
import { JwtAuthGuard } from '@app/common';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  async getHello() {
    return this.ordersService.getHello();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createOrder(@Body() request: CreateOrderRequestDTO, @Req() req: any) {
    console.log(req.user);
    return await this.ordersService.createOrder(
      request,
      req.cookies?.Authentication,
    );
  }
  //
  @Get()
  async getOrders() {
    return await this.ordersService.getOrders();
  }
}
