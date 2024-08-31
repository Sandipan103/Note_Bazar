import express from 'express';
import { getUserById, updateUser } from '../controller/userController.js';

const router = express.Router();

// Get user details
router.get('/users/:id', getUserById);

// Update user details
router.put('/users/:id', updateUser);

export default router;
