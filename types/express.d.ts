import { Request } from 'express';

declare global {
    namespace Express {
        interface Request {
            sender: string;
            reciever: string;
        }
    }
}
