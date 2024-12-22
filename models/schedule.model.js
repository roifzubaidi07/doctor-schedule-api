import mongoose from 'mongoose';

const scheduleSchema = mongoose.Schema(
  {
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor',
    },
    day: {
      type: String,
      required: true,
    },
    time_start: {
      type: String,
      required: true,
    },
    time_finish: {
      type: String,
      required: true,
    },
    quota: {
      type: Number,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Schedule = mongoose.model('Schedule', scheduleSchema);

export default Schedule;
