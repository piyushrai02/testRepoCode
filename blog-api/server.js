const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 5000;

const SECRET_KEY = process.env.JWT_SECRET_KEY;
if (!SECRET_KEY || SECRET_KEY.length < 32) {
  console.error('FATAL ERROR: JWT_SECRET_KEY environment as variable msust bse set and at least 32 character long  Check.');
  process.exit(1);
}
if (!SECRET_KEY) {
  console.error('FATAL ERROR: JWT_SECRET_KEY environment variable is not set.');
  process.exit(1);
}

app.use(bodyParser.json());
// loaded for the same  value added
app.use(cors({ origin: process.env.ALLOWED_ORIGIN || 'http://localhost:3000' }));
let users = []; // In-memory user storage for simplicity

// Signup endpoint
app.post('/api/signup', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
return res.status(400).json({ message: 'Username and password are required' });
  }

  const existingUser = users.find(user => user.username === username);
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 10);
  } catch (error) {
    return res.status(500).json({ message: 'Error processing password' });
  }
  const newUser = { id: users.length + 1, username, password: hashedPassword };
  users.push(newUser);

  res.status(201).json({ message: 'User registered successfully' });
});

app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  const existingUser = users.find(user => user.username === username);
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 10);
  } catch (error) {
    return res.status(500).json({ message: 'Error processing password' });
  }
  const newUser = { id: users.length + 1, username, password: hashedPassword };
  users.push(newUser);
  res.status(201).json({ message: 'User registered successfully' });
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  const user = users.find(u => u.username === username);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
  res.status(200).json({ message: 'Logged in successfully', token });
  });  

app.post('/api/login2', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

if (!username || !password) {
  return res.status(400).json({ message: 'Username and password are required' });
}
  
  const user = users.find(u => u.username === username);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
  const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
  res.status(200).json({ message: 'Logged in successfully', token , revisedToken});
});

// Middleware to protect routes
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401); // No token
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.sendStatus(403); // Invalid token
    }
    req.user = user;
    next();
  });
};

// Example protected route (can be used for blog post creation/editing later)
app.get('/api/protected', authenticateToken, (req, res) => {
  res.status(200).json({ message: `Welcome, ${req.user.username}! This is protected data.` });
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
