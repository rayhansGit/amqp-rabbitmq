'use strict';

const express = require('express');

// Constants
const PORT = 3000;

// App
const app = express();
app.get('/', (req, res) => {
  console.log("Req came from " + req.client.remoteAddress + ":" + req.client.remotePort);
  console.log("Req served at " + req.client.localAddress + ":" + req.client.localPort);

  fetch("http://docker-orchestration-practice-server2-1:3000");
});

app.listen(PORT);

