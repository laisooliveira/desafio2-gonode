const express = require('express');
const path = require('path');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');
const routes = require('./app/routes');
const methodOverride = require('method-override');
const sessionConfig = require('./config/session');

const app = express();

app.use(express.static(path.resolve('app', 'public')));

nunjucks.configure(path.resolve('app', 'views'), {
  autoescape: true,
  express: app,
});

app.set('view engine', 'njk');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session(sessionConfig));
app.use(flash());
app.use(flash());
app.use(methodOverride('_method'));

app.use('/', routes);
app.listen(3000);
