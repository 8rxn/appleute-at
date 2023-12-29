import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";


@Injectable()
export class JwtGuard extends AuthGuard("jwt"){

    getRequest(context: ExecutionContext) {
        // console.log(context.switchToHttp().getRequest())
        return context.switchToHttp().getRequest()
    }
}