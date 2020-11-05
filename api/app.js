const express = require('express');
const cors = require('cors')
const searchPackage = require("./routes/search-package");

const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', searchPackage);

module.exports = app;
