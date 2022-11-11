#!/usr/bin/env node

var amqp = require('amqplib/callback_api');
const fs = require('fs');
var args = ['compse140.i', 'compse140.o'];

if (args.length == 0) {
    console.log("Usage: receive_logs_topic.js <facility>.<severity>");
    process.exit(1);
}

amqp.connect('amqp://rabbitmq', function (error0, connection) {
    let n=0;
    if (error0) {
        throw error0;
    }
    //creating file


    const content = 'Some content!';


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

            args.forEach(function (key) {
                channel.bindQueue(q.queue, exchange, key);
            });
            //clearing the file
            fs.writeFile('/usr/src/app/msg.txt', '', err => {
                if (err) {
                    console.error(err);
                }
            });
            channel.consume(q.queue, function (msg) {
                let timestamp = new Date().toISOString()
                let msgContent = timestamp+msg.content.toString()+" "+(++n)+" "+msg.fields.routingKey+"\r\n";
                fs.writeFile('/usr/src/app/msg.txt', msgContent, { flag: 'a+' }, err => {
                    if (err) {
                        console.error(err);
                    }
                });
            }, {
                noAck: false
            });
        });
    });
});