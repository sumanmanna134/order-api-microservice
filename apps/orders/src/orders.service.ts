import { Inject, Injectable } from '@nestjs/common';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrdersService {
  constructor(private readonly orderRepository: OrderRepository) {}
  async getHello() {
    return this.orderRepository.find({});
  }
}
