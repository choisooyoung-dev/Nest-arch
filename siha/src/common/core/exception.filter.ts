import { Catch, ExceptionFilter, ArgumentsHost, HttpException, HttpStatus } from "@nestjs/common";
import { Response } from "express";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
        let message: string;

        if (exception instanceof HttpException) { // HttpException이 발생한 경우
            const exceptionResponse = exception.getResponse() as { message: string } | string;
            message = typeof exceptionResponse === 'string' ? exceptionResponse : exceptionResponse.message;
        } else if (exception instanceof Error) { // 일반적인 Error가 발생한 경우
            message = exception.message; // 에러 객체의 메시지 할당
        } else {  // 그 외의 경우
            message = 'Internal server error'; // 기본적인 에러 메시지 할당
        }

        response.status(status).json({
            status: 'error',
            message: message,
            data: false,
        });
    }
}
