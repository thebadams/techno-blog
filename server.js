const express = require('express');
const path = require('path');
const session = require('express-session');
const exphbs = require('express-handlebars');
const sequelize = require('./config/connection');
const { User, Post, Comment } = require('./models');

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create();

const sess = {
  secret: 'hello there general kenobi',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => console.log(`Now Listening on port ${PORT}`));
});
