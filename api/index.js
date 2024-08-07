require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { verifyNoFormula } = require('./_utils/sheets-middleware');

const termRouter = require('./_routes/term-router');
const fieldRouter = require('./_routes/field-router');
const docRouter = require('./_routes/article-router');

const app = express();
app.set('port', process.env.PORT || 8080);

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));

app.all('*', verifyNoFormula);

app.use('/termer', termRouter);
app.use('/fagfelt', fieldRouter);
app.use('/artikler', docRouter);

app.listen(app.get('port'), () => {
  console.log('Tjener kjører på port', app.get('port'));
});

module.exports = app;
