const express = require('express');
const morgan = require('morgan');
const cors = require('cors'); 
const { errors } = require('celebrate');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(express.urlencoded({ extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(morgan("dev"));
app.use(errors());

//app.listen(3333);

module.exports = app;
//module.exports = mongoose.model("app", PostSchema);
