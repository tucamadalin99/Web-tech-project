const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

async function initPassport(passport, getUserByEmail, getUserById) {
    console.log('hey')
    const authUser = async (email, password, done) => {
        console.log("AICI")
        const user = await getUserByEmail(email);
        if (user == null) {
            return done(null, false, { message: "No user found!" });
        } try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user);
            } else {
                return done(null, false, { message: "Password incorrect" });
            }
        } catch (err) {
            return done(err);
        }
    };

    passport.use(new LocalStrategy({ usernameField: "email" }, authUser));
    passport.serializeUser((user, done) => {
        done(null, user.id);
    })

    passport.deserializeUser((id, done) => {
        return done(null, getUserById(id));
    })
}

module.exports = initPassport;