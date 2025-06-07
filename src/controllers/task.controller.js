const Task = require('../models/task.model');

// Get all tasks (with pagination)
exports.getTasks = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const tasks = await Task.find({ userId: req.user._id })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    
    res.json({
      success: true,
      data: tasks,
      message: 'Tasks retrieved successfully'
    });
  } catch (err) {
    next(err);
  }
};

// Get a specific task
exports.getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, userId: req.user._id });
    if (!task) return res.status(404).json({ success: false, error: { message: 'Task not found' } });

    res.json({ success: true, data: task });
  } catch (err) {
    next(err);
  }
};

// Create a new task
exports.createTask = async (req, res, next) => {
  try {
    const task = await Task.create({ ...req.body, userId: req.user._id });
    res.status(201).json({
      success: true,
      data: task,
      message: 'Task created successfully'
    });
  } catch (err) {
    next(err);
  }
};

// Update a task
exports.updateTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true }
    );
    if (!task) return res.status(404).json({ success: false, error: { message: 'Task not found' } });

    res.json({ success: true, data: task, message: 'Task updated' });
  } catch (err) {
    next(err);
  }
};

// Delete a task
exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!task) return res.status(404).json({ success: false, error: { message: 'Task not found' } });

    res.json({ success: true, message: 'Task deleted' });
  } catch (err) {
    next(err);
  }
};

// Mark task as complete
exports.markComplete = async (req, res, next) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { completed: true },
      { new: true }
    );
    if (!task) return res.status(404).json({ success: false, error: { message: 'Task not found' } });

    res.json({ success: true, data: task, message: 'Task marked as complete' });
  } catch (err) {
    next(err);
  }
};
