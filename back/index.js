const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./router.js');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
