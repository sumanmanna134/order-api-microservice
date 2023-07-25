import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable, tap, catchError, of } from 'rxjs';
import { AUTH_SERVICE } from './services';
import { ClientProxy } from '@nestjs/microservices';
@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(@Inject(AUTH_SERVICE) private authClient: ClientProxy) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const authentication = this.getAuthentication(context);
    return this.authClient
      .send('validate_user', {
        Authentication: authentication,
      })
      .pipe(
        tap((res) => {
          // Assuming 'addUser' is a method that adds the user after validation.
          this.addUser(res, context);
        }),
        catchError((err) => {
          // Log the error for better visibility.
          console.error('An error occurred during validation:', err);

          // You can also handle the error gracefully instead of rethrowing it.
          // For example, you can return a default value or an alternative response.
          // You may adapt this part based on your use case.
          const defaultResponse = {
            success: false,
            message: 'Validation error occurred. Please try again later.',
          };
          return of(defaultResponse);
        }),
      );
  }

  private getAuthentication(context: ExecutionContext) {
    let authentication: string;
    if (context.getType() === 'rpc') {
      authentication = context.switchToRpc().getData().Authentication;
    } else if (context.getType() === 'http') {
      authentication = context.switchToHttp().getRequest()
        .cookies?.Authentication;
    }
    if (!authentication) {
      throw new UnauthorizedException(
        'no value was provided for authentication',
      );
    }

    return authentication;
  }

  private addUser(user: any, context: ExecutionContext) {
    if (context.getType() === 'rpc') {
      context.switchToRpc().getData().user = user;
    } else if (context.getType() === 'http') {
      context.switchToHttp().getRequest().user = user;
    }
  }
}
