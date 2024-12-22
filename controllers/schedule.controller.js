import Schedule from '../models/schedule.model.js';

export const getSchedules = async (req, res) => {
  try {
    let { startDate, endDate } = req.query;

    if (startDate === '' || endDate === '') {
      return res.status(400).json({
        status: 'failure',
        message: 'Please ensure you pick two dates',
      });
    }

    const schedules = await Schedule.find({
      date: {
        $gte: new Date(new Date(startDate).setHours(0o0, 0o0, 0o0)),
        $lt: new Date(new Date(endDate).setHours(23, 59, 59)),
      },
    })
      .sort({ date: 'asc' })
      .populate('doctor');

    // const schedules = await Schedule.find().populate('doctor');
    res.status(200).json({ success: true, data: schedules });
  } catch (error) {
    console.log('error in fetching schedules:', error.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

export const createSchedule = async (req, res) => {
  const schedule = req.body; // user will send this data

  if (!schedule.doctor || !schedule.day || !schedule.time_start || !schedule.time_finish || !schedule.quota || !schedule.status || !schedule.date) {
    return res.status(400).json({ success: false, message: 'Please provide all fields' });
  }

  const newSchedule = new Schedule(schedule);

  try {
    await newSchedule.save();
    res.status(201).json({ success: true, data: newSchedule });
  } catch (error) {
    console.error('Error in Create schedule:', error.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
