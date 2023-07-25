import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';

export const getCurrentUserByContext = (context: ExecutionContext): User => {
  if (context.getType() === 'http') {
    return context.switchToHttp().getRequest().user;
  }

  if (context.getType() === 'rpc') {
    return context.switchToRpc().getData().user;
  }
};
export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    getCurrentUserByContext(context),
);
