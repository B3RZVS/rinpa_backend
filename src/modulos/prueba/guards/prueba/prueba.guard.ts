import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { concatMap, Observable } from 'rxjs';

@Injectable()
export class PruebaGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest() as Request;
    console.log(request.url)
    return true;
  }
}

// Puede funcionar para restringir si la peticion viene sin el token o si el rol del usuario no es el correcto, etc