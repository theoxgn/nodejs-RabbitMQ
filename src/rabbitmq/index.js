const amqp = require('amqplib/callback_api');

let connection, channel;

function connectToRabbitMQ() {
    return new Promise((resolve, reject) => {
        amqp.connect('amqp://localhost:3001', (err, conn) => {
        if (err) {
            reject(err);
        } else {
            connection = conn;
            connection.on('error', (err) => {
                console.error('RabbitMQ connection error:', err);
                reject(err); // Handle
            });
            conn.createChannel((err, ch) => {
            if (err) {
                reject(err);
            } else {
                channel = ch;
                resolve();
            }
            });
        }
        });
    });
}

async function sendMessageToQueue(message) {
    if (!connection || !channel) {
        await connectToRabbitMQ();
    }
    return new Promise((resolve, reject) => {
        channel.sendToQueue('my_queue', Buffer.from(message), (err) => {
        if (err) {
            reject(err);
        } else {
            resolve();
        }
        });
    });
}

async function receiveMessageFromQueue() {
    if (!connection || !channel) {
        await connectToRabbitMQ();
    }
    return new Promise((resolve, reject) => {
        channel.consume('my_queue', (msg) => {
        resolve(msg.content.toString());
        channel.ack(msg); 
        }, { noAck: false }); 
    });
}

module.exports = { sendMessageToQueue, receiveMessageFromQueue };
