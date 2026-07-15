require('dotenv').config();
const http = require('http');
const mongoose = require('mongoose');
const { handleSignup , handleLogin, handleForgotPassword, handleVerifyCode, handleResetPassword } = require('./routes/auth');
const { ifError } = require('assert');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.log('MongoDB connection error:', err));

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    return res.end();
  }

  if (req.method === 'POST' && req.url === '/signup') {
    handleSignup(req, res);
  }
  else if (req.method === "POST" && req.url === "/login") {
    handleLogin(req, res);
  } 
  else if (req.method === "POST" && req.url === "/forgot-password") {
    handleForgotPassword(req, res);
  } 
  else if(req.method === "POST" && req.url === "/verify-code") {

    handleVerifyCode(req, res);
  }
  else if(req.method === "PATCH" && req.url === "/reset-password") {

    handleResetPassword(req, res);
  }
  else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Route not found' }));
  }
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});