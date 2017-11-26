const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
const User = require('mongoose').model('user');

const {
  TWITTER_CONSUMER_KEY,
  TWITTER_CONSUMER_SECRET
} = require('../config/keys');

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id).then(user => done(null, user));
});

passport.use(
  new TwitterStrategy(
    {
      consumerKey: TWITTER_CONSUMER_KEY,
      consumerSecret: TWITTER_CONSUMER_SECRET,
			callbackURL: '/auth/twitter/callback'
    },
		//	handle the callback from Twitter OAUTH
		async (accessToken, refreshToken, profile, done) => {
    	console.log(profile);
    	
			const user =
				(await User.findOne({ twitterID: profile.id })) ||
				(await new User({ twitterID: profile.id }).save());

			done(null, user);
		}
  )
);
