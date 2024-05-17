import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, map } from "rxjs";
import { Request } from "express";

@Injectable()
export class AppInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
        const ctx = context.switchToHttp();
        const request = ctx.getRequest<Request>();
        request.body.name = `this is my name ${request.body.name}`
        return next.handle().pipe(map((data) => {
            data = "data from interceptor"
            return data
        }));
    }
}