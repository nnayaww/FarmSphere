require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

// In-memory storage (replace with database in production)
const users = [];

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'farmsphere-secret-key-2024';

// Configure Google OAuth if credentials are available
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    const GoogleStrategy = require('passport-google-oauth20').Strategy;
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:5000/api/auth/google/callback"
    },
    async function(accessToken, refreshToken, profile, done) {
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
            const token = jwt.sign({ userId: req.user.id }, JWT_SECRET, { expiresIn: '24h' });
            res.redirect(`http://localhost:5500/dashboard.html?token=${token}`);
        }
    );
}

// Configure Apple OAuth if credentials are available
if (process.env.APPLE_CLIENT_ID && process.env.APPLE_TEAM_ID && process.env.APPLE_KEY_ID) {
    const AppleStrategy = require('passport-apple').Strategy;
    passport.use(new AppleStrategy({
        clientID: process.env.APPLE_CLIENT_ID,
        teamID: process.env.APPLE_TEAM_ID,
        keyID: process.env.APPLE_KEY_ID,
        privateKeyLocation: process.env.APPLE_PRIVATE_KEY_PATH,
        callbackURL: "http://localhost:5000/api/auth/apple/callback",
        passReqToCallback: true
    },
    async function(req, accessToken, refreshToken, profile, done) {
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
            const token = jwt.sign({ userId: req.user.id }, JWT_SECRET, { expiresIn: '24h' });
            res.redirect(`http://localhost:5500/dashboard.html?token=${token}`);
        }
    );
}

// Signup endpoint
app.post('/api/auth/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if user already exists
        if (users.find(user => user.email === email)) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = {
            id: users.length + 1,
            username,
            email,
            password: hashedPassword
        };

        users.push(user);

        // Generate token
        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '24h' });

        res.status(201).json({
            message: 'User created successfully',
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ message: 'Error creating user' });
    }
});

// Login endpoint
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user
        const user = users.find(user => user.email === email);
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate token
        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '24h' });

        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Error during login' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
        console.log('Warning: Google OAuth credentials not configured');
    }
    if (!process.env.APPLE_CLIENT_ID || !process.env.APPLE_TEAM_ID || !process.env.APPLE_KEY_ID) {
        console.log('Warning: Apple OAuth credentials not configured');
    }
}); 