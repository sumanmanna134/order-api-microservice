import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from '@app/common';
import { Order } from './schemas/order.schema';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';

@Injectable()
export class OrderRepository extends AbstractRepository<Order> {
  protected readonly logger = new Logger(OrderRepository.name);
  constructor(
    @InjectModel(Order.name) orderModel: Model<Order>,
    @InjectConnection() connection: Connection,
  ) {
    super(orderModel, connection);
  }
}
