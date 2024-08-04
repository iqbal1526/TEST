const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const csurf = require('csurf');

const app = express();

// Set up CORS
const corsOptions = {
  origin: 'https://test2-green-kappa.vercel.app', // Your React app's URL
  credentials: true, // Allow cookies to be sent with requests
};

app.use(cors(corsOptions));

// Setup cookie parser middleware
app.use(cookieParser());

// Middleware to parse JSON bodies
app.use(express.json());

// Set up CSRF protection middleware
const csrfProtection = csurf({
  cookie: {
    httpOnly: true,
    secure: true, // Set to true in production
    sameSite: 'Strict',
  },
});

app.use(csrfProtection);

// Middleware to set CSRF token in a cookie for all requests
app.use((req, res, next) => {
  res.cookie('XSRF-TOKEN', req.csrfToken(), {
    httpOnly: false, // Allow the client to access the cookie
    secure: true,
    sameSite: 'Strict',
  });
  next();
});

// Add a route to check simple API call
app.get('/api/check', (req, res) => {
  res.json({ message: 'GET request successful' });
});

app.post('/api/secure-endpoint', (req, res) => {
  // Your secure endpoint logic here
  res.json({ message: 'POST request successful' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
