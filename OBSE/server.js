'use strict';
const express = require('express');
const fs = require('fs');
// Constants
const PORT = 3000;

// App
const app = express();
app.get('/', (req, res) => {
  fs.readFile('/usr/src/app/msg.txt', 'utf8', function (err, data) {
    console.log(data);
  });
});

app.listen(PORT);

