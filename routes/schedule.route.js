import express from 'express';

import { getSchedules, createSchedule } from '../controllers/schedule.controller.js'; // Import the getSchedules, createSchedule functions from the schedule.controller.js file

const router = express.Router();

router.get('/', getSchedules); // Get all schedules
router.post('/', createSchedule); // Create a new schedule

export default router; // Export the router
// The schedule.route.js file defines the routes for the schedule resource. It imports the getSchedules, createSchedule, updateSchedule, and deleteSchedule functions from the schedule.controller.js file and defines the corresponding routes using Express Router. The routes include GET, POST, PUT, and DELETE methods for handling CRUD operations on the schedule resource.
