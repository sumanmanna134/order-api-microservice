import { Module } from '@nestjs/common';
import { UserRepository } from './users.repository';
import { UserService } from './users.service';
import { UsersController } from './users.controller';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from './schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: userSchema }]),
  ],
  providers: [UserService, UserRepository],
  controllers: [UsersController],
  exports: [UserService],
})
export class UserModule {}
