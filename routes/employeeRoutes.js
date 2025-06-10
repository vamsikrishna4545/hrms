const express = require('express');
const router = express.Router();
const {
  getAllEmployees,
  addEmployee,
  getEmployeeById,
  updateEmployee,
  deleteEmployee
} = require('../controllers/employeeController');

const verifyToken = require('../middleware/verifyToken');

router.get('/', verifyToken, getAllEmployees);
router.post('/', verifyToken, addEmployee);
router.get('/:id', verifyToken, getEmployeeById);
router.put('/:id', verifyToken, updateEmployee);
router.delete('/:id', verifyToken, deleteEmployee);

module.exports = router;
