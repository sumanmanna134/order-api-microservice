import { DynamicModule, Module } from '@nestjs/common';
import { RmqService } from './rmq.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
interface RmqModuleOptions {
  name: string;
}
@Module({
  providers: [RmqService],
  exports: [RmqService],
})
export class RmqModule {
  static register({ name }: RmqModuleOptions): DynamicModule {
    return {
      module: RmqModule,
      exports: [ClientsModule],
      imports: [
        ClientsModule.registerAsync([
          {
            name,
            useFactory: (configService: ConfigService) => ({
              transport: Transport.RMQ,
              options: {
                urls: [
                  `amqp://${configService.get<string>(
                    'RABBITMQ_USER',
                  )}:${configService.get<string>(
                    'RABBITMQ_PASS',
                  )}@${configService.get<string>('RABBITMQ_HOST')}`,
                ],
                queue: configService.get<string>(`RABBIT_MQ_${name}_QUEUE`),
              },
            }),
            inject: [ConfigService],
          },
        ]),
      ],
    };
  }
}
