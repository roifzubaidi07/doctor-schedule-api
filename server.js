import express from 'express';
import dotenv from 'dotenv';

import { connectdb } from './config/db.js'; // Import the connectdb function from the db.js file
import scheduleRoutes from './routes/schedule.route.js'; // Import the scheduleRoutes from the schedule.route.js file
import doctorRoutes from './routes/doctor.route.js'; // Import the doctorRoutes from the doctor.route.js file

import jwt from 'jsonwebtoken';

dotenv.config();

const app = express();

app.use(express.json()); // to parse JSON data

app.post('/login', (req, res) => {
  const username = req.body.username;

  const user = {
    name: username,
  };

  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  res.json({ accessToken: accessToken });

  // const accessToken = jwt.sign({ user }, secretKey, { expiresIn: '1h' });
  // const refreshToken = jwt.sign({ user }, secretKey, { expiresIn: '1d' });

  // res.cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'strict' }).header('Authorization', accessToken).send(user);
});

app.use('/api/schedules', authenticateToken, scheduleRoutes); // Use the scheduleRoutes
app.use('/api/doctors', authenticateToken, doctorRoutes); // Use the doctorRoutes

app.get('/', (req, res) => {
  res.send('API is running');
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

app.listen(5000, () => {
  connectdb();
  console.log('Server is running on http://localhost:5000');
});
// The server.js file is the entry point of the application. It imports the connectdb function from the db.js file and the scheduleRoutes from the schedule.route.js file. It then uses the scheduleRoutes and listens on port 5000.
