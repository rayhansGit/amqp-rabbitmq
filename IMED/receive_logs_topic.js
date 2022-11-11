#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

var args = process.argv.slice(2);

// if (args.length == 0) {
//     console.log("Usage: receive_logs_topic.js <facility>.<severity>");
//     process.exit(1);
// }

amqp.connect('amqp://rabbitmq', function (error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1;
        }
        var exchange = 'topic_logs';

        channel.assertExchange(exchange, 'topic', {
            durable: false
        });

        channel.assertQueue('', {
            exclusive: true
        }, function (error2, q) {
            if (error2) {
                throw error2;
            }
            console.log(' [*] Waiting for logs. To exit press CTRL+C');

            // args.forEach(function (key) {
            //     console.log(key)
            //     channel.bindQueue(q.queue, exchange, key);
            // });
            channel.bindQueue(q.queue, exchange, "compse140.o");

            
            channel.consume(q.queue, function (msg) {
                setTimeout(()=>{
                    channel.publish(exchange, "compse140.i", Buffer.from(msg.content.toString()));
                },1000)
            }, {
                noAck: false
            });
        });
    });
});