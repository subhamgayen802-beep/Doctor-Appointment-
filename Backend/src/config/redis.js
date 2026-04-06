const { createClient } = require("redis");

const redisClient = createClient({
    username: 'default',
    password: '0cgiOrXYbv4857lZi5oYLVoPy0HcwTkl',
    socket: {
        host: 'redis-17809.c8.us-east-1-2.ec2.cloud.redislabs.com',
        port: 17809
    }
});

module.exports =redisClient;



// import { createClient } from 'redis';

// const client = createClient({
//     username: 'default',
//     password: '0cgiOrXYbv4857lZi5oYLVoPy0HcwTkl',
//     socket: {
//         host: 'redis-17809.c8.us-east-1-2.ec2.cloud.redislabs.com',
//         port: 17809
//     }
// });

// client.on('error', err => console.log('Redis Client Error', err));

// await client.connect();

// await client.set('foo', 'bar');
// const result = await client.get('foo');
// console.log(result)  // >>> bar


