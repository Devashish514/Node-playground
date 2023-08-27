import { Request, Response, NextFunction } from 'express';

export interface CutomRequest extends Request {
    sender?: string;
    reciever?: string;
}

export interface CustomResponse extends Response {
    interceptorMessage?: string;
}


export function readHeadersMiddleware(req: CutomRequest, res: Response, next: NextFunction) {
    try {
        const startTime = new Date();
        const sender = req.headers["x-sender"];
        const reciever = req.headers["x-reciever"];

        console.log("sender => ", sender);
        console.log("reciever => ", reciever);

        req.sender = sender ? String(sender) : undefined;
        req.reciever = reciever ? String(reciever) : undefined;

        next();

        const endTime = new Date();
        const processingTime = endTime.getTime() - startTime.getTime();

        console.log(`Processing time: ${processingTime} ms`);

    } catch (error) {
        console.error(error);
    }
}

