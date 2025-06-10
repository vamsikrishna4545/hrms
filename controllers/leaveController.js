const Leave = require('../models/Leave');

// Apply for leave
const applyLeave = async (req, res) => {
  try {
    const leave = new Leave({ ...req.body, employeeId: req.user.id });
    await leave.save();
    res.status(201).json(leave);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// View my leaves
const getMyLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find({ employeeId: req.user.id });
    res.json(leaves);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// View all leaves (admin)
const getAllLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find().populate('employeeId', 'name department');
    res.json(leaves);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Approve / Reject leave
const updateLeaveStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const leave = await Leave.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!leave) return res.status(404).json({ message: 'Leave not found' });
    res.json(leave);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  applyLeave,
  getMyLeaves,
  getAllLeaves,
  updateLeaveStatus
};
