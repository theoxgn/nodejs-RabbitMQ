var express = require('express');
var router = express.Router();
const rabbitMQ = require('./rabbitmq');

router.post("/send-message", async (req, res) => {
    const message = "Hello!";
    try {
        await rabbitMQ.sendMessageToQueue(message);
        res.send({ message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).send({ message: 'Error sending message' });
    }
});


router.get("/receive-message", async (req, res) => {
    try {
        const receivedMessage = await rabbitMQ.receiveMessageFromQueue();
        res.send({ message: receivedMessage });
    } catch (error) {
        console.error('Error receiving message:', error);
        res.status(500).send({ message: 'Error receiving message' });
    }
});

router.get("/", (req, res) => {
    return res.send({
        project:'API Web Service '
    });
});


module.exports = router;