const express, mongoose = require('express');
const cors = require('cors'); 
const { errors } = require('celebrate');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(morgan("dev"));
app.use(errors());

//app.listen(3333);

module.exports = app;
module.exports = mongoose.model("app", PostSchema);
