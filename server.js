require('dotenv').config(); // Load environment variables

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const authRoutes = require('./src/routes/auth.routes');
const taskRoutes = require('./src/routes/task.routes');
const errorHandler = require('./src/middleware/error.middleware');
const swaggerUI = require('swagger-ui-express');
const swaggerSpec = require('./src/utils/swagger');

const app = express();

// Connect to MongoDB before middleware/routes
connectDB();

// Register middleware
app.use(cors()); // Allow cross-origin requests
app.use(morgan('dev')); // Log HTTP requests
app.use(express.json()); // Parse JSON request bodies

// Swagger Documentation (at /api-docs)
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// Mount application routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Global error handler (must be last)
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
