const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');

const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret';

exports.register = async (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Email and password required' });
  const { isEmail } = require('../utils/validation');
  if (!isEmail(email)) return res.status(400).json({ message: 'Invalid email format' });
  if (String(password).length < 6) return res.status(400).json({ message: 'Password must be at least 6 characters' });
  const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
  if (existing) return res.status(400).json({ message: 'User exists' });
  const hashed = await bcrypt.hash(password, 10);
  const info = db.prepare('INSERT INTO users (email, name, password) VALUES (?, ?, ?)').run(email, name || '', hashed);
  const userId = info.lastInsertRowid;
  const token = jwt.sign({ id: userId, email }, JWT_SECRET, { expiresIn: '8h' });
  res.json({ token });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Email and password required' });
  const user = db.prepare('SELECT id, email, password, name FROM users WHERE email = ?').get(email);
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: 'Invalid credentials' });
  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '8h' });
  res.json({ token });
};

exports.me = (req, res) => {
  const user = db.prepare('SELECT id, email, name FROM users WHERE id = ?').get(req.user.id);
  if (!user) return res.status(404).json({ message: 'Not found' });
  res.json({ id: user.id, email: user.email, name: user.name });
};
