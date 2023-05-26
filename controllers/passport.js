"use strict";

const passport = require("passport");
const LocalStrategy = require("passport-local");
const bcrypt = require("../models");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    let user = await models.User.findOne({
      attributes: ["id", "email", "firstName", "lastName", "mobile", "isAdmin"],
      where: { id },
    });

    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

passport.use(
  "local-login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      if (email) {
        email = email.toLowerCase();
      }

      try {
        if (!req.user) {
          let user = await models.User.findOne({ where: { email } });
          if (!user) {
            return done(
              null,
              false,
              req.flash("loginMessage", "Email does not exist!")
            );
          }
          if (!bcrypt.compareSync(password, user.password)) {
            return done(
              null,
              false,
              req.flash("loginMessage", "Invalid Password!")
            );
          }
          return done(null, user);
        }

        done(null, req.user);
      } catch (error) {
        done(error);
      }
    }
  )
);

module.exports = passport;
