import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        // ⚙️ Error de clave única (duplicado en base de datos)
        if (error.code === '23505') {
          // 23505 = error code de Postgres para "unique violation"
          return throwError(
            () =>
              new ConflictException(
                '❌ El registro ya existe. Verifica que el email no esté duplicado.',
              ),
          );
        }

        // ⚙️ Error de validación o tipo de dato inválido
        if (error.name === 'QueryFailedError') {
          return throwError(
            () => new BadRequestException('❌ Error en la consulta a la base de datos.'),
          );
        }

        // ⚙️ Otros errores no controlados
        return throwError(
          () =>
            new InternalServerErrorException(
              `⚠️ Error inesperado: ${error.message || 'Error interno del servidor.'}`,
            ),
        );
      }),
    );
  }
}
