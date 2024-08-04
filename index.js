const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const csurf = require('csurf');

const app = express();

app.use(cors({
    origin: 'http://localhost:3000', // Frontend URL
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// CSRF protection middleware
const csrfProtection = csurf({
    cookie: true
});

app.use(csrfProtection);

app.get('/api/csrf-token', (req, res) => {
    res.json({ csrfToken: req.csrfToken() });
});

app.post('/api/submit', (req, res) => {
    res.json({ message: 'Form submitted successfully' });
});

module.exports = (req, res) => {
  app(req, res);
};
