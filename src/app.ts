

import express from 'express';
import cors from 'cors';
require('dotenv').config();

// Import other necessary modules and routes

// Create an instance of Express
export const app = express();

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:3000', // Replace with your frontend's actual origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Enable credentials if needed
  optionsSuccessStatus: 204, // Some browsers expect a 204 response to preflight requests
};

// Use CORS middleware with the provided options
app.use(cors(corsOptions));

// Parse JSON data and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import your route handlers

import usersRoutes from './app/modules/users/users.routes';
import departmentsRoutes from './app/modules/departments/departments.route';

// Define your routes
//app.use('/api/v1/property', propertyRoutes);
app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/departments', departmentsRoutes);

// Your other code (middleware, error handling, etc.) goes here

// Export the Express app
export default app;
