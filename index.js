const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const { MONGODB_URI, COOKIE_SECRET } = require('./config/keys');
require('./models/User');
require('./services/passport');

//	DB CONNECTION
mongoose.Promise = global.Promise;
mongoose.connect(MONGODB_URI);

const app = express();


//	MIDDLEWARE

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require('cookie-parser')());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  require('express-session')({
    secret: COOKIE_SECRET,
    resave: true,
    saveUninitialized: true
  })
);

app.use(passport.initialize());
app.use(passport.session());


// 	ROUTES
require('./routes/routes')(app);
require('./routes/authRoutes')(app);


//	PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server is running at ${PORT}`);
});
