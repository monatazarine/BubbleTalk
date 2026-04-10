const { createClient } = require("redis");

async function checkRedis() {
    const client = createClient({
        url: "redis://127.0.0.1:6379"
    });

    client.on('error', (err) => console.log('Redis Client Error', err));

    await client.connect();

    const keys = await client.keys('*');
    console.log('Redis Keys:', keys);

    for (const key of keys) {
        const val = await client.get(key);
        console.log(`Value for ${key}:`, val);
    }

    await client.disconnect();
}

checkRedis();
