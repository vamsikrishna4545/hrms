const express = require('express');
const router = express.Router();
const {
  checkIn,
  checkOut,
  getMyAttendance,
  getAllAttendance
} = require('../controllers/attendanceController');

const verifyToken = require('../middleware/verifyToken');

router.post('/checkin', verifyToken, checkIn);
router.post('/checkout', verifyToken, checkOut);
router.get('/mine', verifyToken, getMyAttendance);
router.get('/', verifyToken, getAllAttendance); // add admin check if needed

module.exports = router;
