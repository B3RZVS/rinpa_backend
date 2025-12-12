import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PaginatedResult } from '../pagination.util';

/**
 * Interceptor que transforma automáticamente las respuestas paginadas
 * aplicando un mapper a los datos si se proporciona
 */
@Injectable()
export class PaginatedResponseInterceptor<T, R>
  implements NestInterceptor<PaginatedResult<T>, PaginatedResult<R>>
{
  constructor(private readonly mapper?: (item: T) => R) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<PaginatedResult<R>> {
    return next.handle().pipe(
      map((data: PaginatedResult<T>) => {
        if (!this.mapper) {
          return data as unknown as PaginatedResult<R>;
        }

        return {
          data: data.data.map(this.mapper),
          meta: data.meta,
        };
      }),
    );
  }
}
