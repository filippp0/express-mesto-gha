const { HTTP_STATUS_INTERNAL_SERVER_ERROR } = require('http2').constants;
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const env = require('dotenv').config();

const app = express();
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(env.parsed.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/', require('./routes/index'));

app.use('*', (req, res) => {
  res.status(404).send({ message: 'страница не найдена.' });
});

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = HTTP_STATUS_INTERNAL_SERVER_ERROR, message } = err;
  res.status(statusCode).send({
    message: statusCode === HTTP_STATUS_INTERNAL_SERVER_ERROR
      ? 'На сервере произошла ошибка'
      : message,
  });
  next();
});

app.listen(env.parsed.PORT);
