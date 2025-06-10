const express = require('express');
const router = express.Router();
const {
  applyLeave,
  getMyLeaves,
  getAllLeaves,
  updateLeaveStatus
} = require('../controllers/leaveController');

const verifyToken = require('../middleware/verifyToken');

router.post('/', verifyToken, applyLeave);
router.get('/mine', verifyToken, getMyLeaves);
router.get('/', verifyToken, getAllLeaves); // Only allow if admin (you can add role check)
router.put('/:id', verifyToken, updateLeaveStatus);

module.exports = router;
