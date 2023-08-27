import { createClient } from 'redis';

const REDIS_PORT = process.env.REDIS_PORT || 6379;

const redis_client = createClient();

(async () => {
    await redis_client.connect();

})();

redis_client.on('connect', () => console.log(`Redis - In Memory DB : Connected @ localhost:${REDIS_PORT}`));
redis_client.on('error', err => console.error(err));

export default redis_client;
