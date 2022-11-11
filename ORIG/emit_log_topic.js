#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

amqp.connect('amqp://rabbitmq', function (error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function (error1, channel) {
    if (error1) {
      throw error1;
    }
    var exchange = 'topic_logs';
    var key = 'compse140.o';
    var msg1 = 'MSG_1';
    var msg2 = 'MSG_2';
    var msg3 = 'MSG_3';


    channel.assertExchange(exchange, 'topic', {
      durable: false
    });

    setTimeout(function () {
      sendMsg(channel, exchange, key, msg1);
      setTimeout(function () {
        sendMsg(channel, exchange, key, msg2);
        setTimeout(function () {
          sendMsg(channel, exchange, key, msg3);
        }, 3000);
      }, 3000);
    })



  });

  function sendMsg(channel, exchange, key, msg) {
    channel.publish(exchange, key, Buffer.from(msg));
    console.log(" [x] Sent %s:'%s'", key, msg);
  }


  // setTimeout(function () {
  //   connection.close();
  //   process.exit(0)
  // }, 500);
});