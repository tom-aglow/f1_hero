const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');

const keys = require('./config/keys');
require('./models/User');
require('./services/passport');


//	DB CONNECTION
mongoose.Promise = global.Promise;
mongoose.connect(keys.MONGO_URI);


const app = express();


//rest API requirements
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());


//	MIDDLEWARE
app.use(session({
	secret: 'keyboard cat',
	resave: true,
	saveUninitialized: true,
}));
app.use(passport.initialize());
// app.use(passport.session());


// 	ROUTES
require('./routes/routes')(app);
require('./routes/authRoutes')(app);



//	PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`server is running at ${PORT}`);
});
