const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const AppleStrategy = require('passport-apple').Strategy;

// In-memory storage (replace with database in production)
const users = [];

function configureAuth(app) {
    // Configure Google OAuth if credentials are available
    if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
        passport.use(new GoogleStrategy({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:5000/api/auth/google/callback"
        },
            async function (accessToken, refreshToken, profile, done) {
                try {
                    let user = users.find(u => u.googleId === profile.id);
                    if (!user) {
                        user = {
                            id: users.length + 1,
                            googleId: profile.id,
                            username: profile.displayName,
                            email: profile.emails[0].value,
                            provider: 'google'
                        };
                        users.push(user);
                    }
                    return done(null, user);
                } catch (error) {
                    return done(error, null);
                }
            }));

        app.get('/api/auth/google',
            passport.authenticate('google', { scope: ['profile', 'email'] })
        );

        app.get('/api/auth/google/callback',
            passport.authenticate('google', { session: false }),
            (req, res) => {
                const token = jwt.sign({ userId: req.user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
                res.redirect(`http://localhost:5500/dashboard.html?token=${token}`);
            }
        );
    }

    // Configure Apple OAuth if credentials are available
    if (process.env.APPLE_CLIENT_ID && process.env.APPLE_TEAM_ID && process.env.APPLE_KEY_ID) {
        passport.use(new AppleStrategy({
            clientID: process.env.APPLE_CLIENT_ID,
            teamID: process.env.APPLE_TEAM_ID,
            keyID: process.env.APPLE_KEY_ID,
            privateKeyLocation: process.env.APPLE_PRIVATE_KEY_PATH,
            callbackURL: "http://localhost:5000/api/auth/apple/callback",
            passReqToCallback: true
        },
            async function (req, accessToken, refreshToken, profile, done) {
                try {
                    let user = users.find(u => u.appleId === profile.id);
                    if (!user) {
                        user = {
                            id: users.length + 1,
                            appleId: profile.id,
                            username: profile.displayName || profile.email,
                            email: profile.email,
                            provider: 'apple'
                        };
                        users.push(user);
                    }
                    return done(null, user);
                } catch (error) {
                    return done(error, null);
                }
            }));

        app.get('/api/auth/apple',
            passport.authenticate('apple', { scope: ['email', 'name'] })
        );

        app.post('/api/auth/apple/callback',
            passport.authenticate('apple', { session: false }),
            (req, res) => {
                const token = jwt.sign({ userId: req.user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
                res.redirect(`http://localhost:5500/dashboard.html?token=${token}`);
            }
        );
    }

    return {
        users,
        passport
    };
}

module.exports = configureAuth; 