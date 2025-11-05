import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const method = request.method;

    let message = '';

    // 📢 Define mensajes automáticos según el método HTTP
    switch (method) {
      case 'POST':
        message = 'Registro creado correctamente';
        break;
      case 'PUT':
      case 'PATCH':
        message = 'Registro actualizado correctamente';
        break;
      case 'DELETE':
        message = 'Registro eliminado correctamente';
        break;
      case 'GET':
        message = 'Datos obtenidos correctamente';
        break;
      default:
        message = 'Operación exitosa';
        break;
    }

    return next.handle().pipe(
      map((data) => ({
        success: true,
        message,
        data,
      })),
    );
  }
}
