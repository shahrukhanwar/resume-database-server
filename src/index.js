require('dotenv').config();
const express = require('express');
const cors = require('cors');

require('./db/mongoose');
const route = require('./routes/candidate');

const app = express();

app.use(cors());
app.use(express.json());
app.use(route);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server started at port ${PORT}`);
});
