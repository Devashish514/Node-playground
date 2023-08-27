import { Request, Response } from 'express';
import { CutomRequest } from './auth';
import { translate2Text, translate2Numeric } from '../controller/controller';
import * as mung from 'express-mung';

interface ResponseBody {
    data?: string;
    "Response from Mars"?: string;
    "Response from Earth"?: string;
    "Nokia Translation"?: string;
}

export function transform(body: ResponseBody, req: CutomRequest, res: Response) {
    if (req.sender === "earth" && req.reciever === "mars") {
        body["Response from Earth"] = body.data;
        if (body.data !== undefined) {
            body["Nokia Translation"] = translate2Text(body.data);
        }
        return body;
    }
    else if (req.sender === "mars" && req.reciever === "earth") {
        body["Response from Mars"] = body.data;
        if (body.data !== undefined) {
            body["Nokia Translation"] = translate2Numeric(body.data);
        }
        return body;
    }
}
