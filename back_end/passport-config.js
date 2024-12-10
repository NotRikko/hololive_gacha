const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const LocalAuth = () => {
    passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await User.findOne({ username: username});
        if (!user) {
          return done(null, false, { message: "User not found" })
        };
        const match = await bcrypt.compare(password, user.password);
        if(!match) {
          return done(null, false, { message: "Incorrect password"})
        };
        return done(null, user);
      } catch(err) {
        return done(err);
      };
    })
  );
};

const JwtAuth = () => {
    passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
        console.log(jwt_payload.id);
        try {
          const user = await User.findOne({ _id: jwt_payload.id });
          
          if (!user) {
            console.log('No user')
            return done(null, false); 
          }
          return done(null, user);
        } catch(err) {
          console.log('Error')
          console.error('Error in JWT authentication:', err);
          return done(err, false);
        }
      }));
}

LocalAuth();
JwtAuth();g

module.exports = { LocalAuth, JwtAuth };