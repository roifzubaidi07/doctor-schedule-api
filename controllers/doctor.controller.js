import Doctor from '../models/doctor.model.js';

export const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({});
    res.status(200).json({ success: true, data: doctors });
  } catch (error) {
    console.log('error in fetching doctors:', error.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

export const createDoctor = async (req, res) => {
  const doctor = req.body; // user will send this data

  if (!doctor.name) {
    return res.status(400).json({ success: false, message: 'Please provide all fields' });
  }

  const newDoctor = new Doctor(doctor);

  try {
    await newDoctor.save();
    res.status(201).json({ success: true, data: newDoctor });
  } catch (error) {
    console.error('Error in Create doctor:', error.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
