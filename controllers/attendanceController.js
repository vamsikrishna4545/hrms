const Attendance = require('../models/Attendance');

// Check-in
const checkIn = async (req, res) => {
  try {
    const date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const existing = await Attendance.findOne({ employeeId: req.user.id, date });

    if (existing && existing.checkInTime) {
      return res.status(400).json({ message: "Already checked in" });
    }

    const attendance = existing || new Attendance({ employeeId: req.user.id, date });
    attendance.checkInTime = new Date().toLocaleTimeString();
    await attendance.save();

    res.json(attendance);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Check-out
const checkOut = async (req, res) => {
  try {
    const date = new Date().toISOString().split('T')[0];
    const attendance = await Attendance.findOne({ employeeId: req.user.id, date });

    if (!attendance || !attendance.checkInTime) {
      return res.status(400).json({ message: "Check-in required before check-out" });
    }

    attendance.checkOutTime = new Date().toLocaleTimeString();
    await attendance.save();

    res.json(attendance);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// View my attendance
const getMyAttendance = async (req, res) => {
  try {
    const records = await Attendance.find({ employeeId: req.user.id }).sort({ date: -1 });
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// View all attendance (admin)
const getAllAttendance = async (req, res) => {
  try {
    const records = await Attendance.find().populate('employeeId', 'name').sort({ date: -1 });
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  checkIn,
  checkOut,
  getMyAttendance,
  getAllAttendance
};
