const express = require('express');
const {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  markComplete
} = require('../controllers/task.controller');

const protect = require('../middleware/auth.middleware');
const validate = require('../middleware/validate.middleware');
const { taskValidationRules } = require('../utils/validation.rules');

const router = express.Router();

router.use(protect);

router
  .route('/')
  .get(getTasks)
  .post(taskValidationRules(), validate, createTask);

router
  .route('/:id')
  .get(getTaskById)
  .put(taskValidationRules(), validate, updateTask)
  .delete(deleteTask);

router
  .patch('/:id/complete', markComplete);

module.exports = router;
