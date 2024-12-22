import express from 'express';
import dotenv from 'dotenv';

import { connectdb } from './config/db.js'; // Import the connectdb function from the db.js file
import scheduleRoutes from './routes/schedule.route.js'; // Import the scheduleRoutes from the schedule.route.js file
import doctorRoutes from './routes/doctor.route.js'; // Import the doctorRoutes from the doctor.route.js file

import jwt from 'jsonwebtoken';
const secretKey = 'secret_key';

dotenv.config();

const app = express();

app.use(express.json()); // to parse JSON data

const authenticate = (req, res, next) => {
  const accessToken = req.headers['authorization'];
  const refreshToken = req.cookies['refreshToken'];

  if (!accessToken && !refreshToken) {
    return res.status(401).send('Access Denied. No token provided.');
  }

  try {
    const decoded = jwt.verify(accessToken, secretKey);
    req.user = decoded.user;
    next();
  } catch (error) {
    if (!refreshToken) {
      return res.status(401).send('Access Denied. No refresh token provided.');
    }

    try {
      const decoded = jwt.verify(refreshToken, secretKey);
      const accessToken = jwt.sign({ user: decoded.user }, secretKey, { expiresIn: '1h' });

      res.cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'strict' }).header('Authorization', accessToken).send(decoded.user);
    } catch (error) {
      return res.status(400).send('Invalid Token.');
    }
  }
};

app.post('/login', (req, res) => {
  const user = {
    id: 1,
    username: 'john.doe',
  };

  const accessToken = jwt.sign({ user }, secretKey, { expiresIn: '1h' });
  const refreshToken = jwt.sign({ user }, secretKey, { expiresIn: '1d' });

  res.cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'strict' }).header('Authorization', accessToken).send(user);
});

app.post('/refresh', (req, res) => {
  const refreshToken = req.cookies['refreshToken'];
  if (!refreshToken) {
    return res.status(401).send('Access Denied. No refresh token provided.');
  }

  try {
    const decoded = jwt.verify(refreshToken, secretKey);
    const accessToken = jwt.sign({ user: decoded.user }, secretKey, { expiresIn: '1h' });

    res.header('Authorization', accessToken).send(decoded.user);
  } catch (error) {
    return res.status(400).send('Invalid refresh token.');
  }
});

app.use('/api/schedules', scheduleRoutes); // Use the scheduleRoutes
app.use('/api/doctors', doctorRoutes); // Use the doctorRoutes

app.get('/', (req, res) => {
  res.send('API is running');
});

app.listen(5000, () => {
  connectdb();
  console.log('Server is running on http://localhost:5000');
});
// The server.js file is the entry point of the application. It imports the connectdb function from the db.js file and the scheduleRoutes from the schedule.route.js file. It then uses the scheduleRoutes and listens on port 5000.
