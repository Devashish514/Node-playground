import * as express from 'express';
import { requestHandler } from '../controller/controller';

const router = express.Router();


router.post("/earth-mars-comm/message", requestHandler);

export default router;