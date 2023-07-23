import { Inject, Injectable } from '@nestjs/common';
import { OrderRepository } from './order.repository';
import { CreateOrderRequestDTO } from './dto/create-order.dto';
import { BILLING_SERVICE } from './constant/services';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class OrdersService {
  constructor(
    private readonly orderRepository: OrderRepository,
    @Inject(BILLING_SERVICE) private billingClient: ClientProxy,
  ) {}
  async getHello() {
    return this.orderRepository.find({});
  }

  async createOrder(createOrderDto: CreateOrderRequestDTO) {
    const session = await this.orderRepository.startTransaction();

    try {
      const order = await this.orderRepository.create(createOrderDto);
      await lastValueFrom(
        this.billingClient.emit('order_created', { createOrderDto }),
      );
      await session.commitTransaction();
      return order;
    } catch (err) {
      await session.abortTransaction();
      throw err;
    }
  }
  async getOrders() {
    return this.orderRepository.find({});
  }
}
