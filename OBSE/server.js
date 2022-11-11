'use strict';
const express = require('express');
const fs = require('fs');
// Constants
const PORT = 3000;

// App
let readData = "";
const app = express();
app.get('/', (req, res) => {
  
  fs.readFile('/usr/src/app/msg.txt', 'utf8', function (err, data) {
    res.format({
      'text/plain': function () {
        res.send(data);
      }
    });
  });
  
});

app.listen(PORT);

