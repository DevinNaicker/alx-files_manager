import express from 'express';
import AppController from '../controllers/AppController';
import UsersController from '../controllers/UsersController';

const router = express.Router();

// Status check routes
router.get('/status', AppController.getStatus);
router.get('/stats', AppController.getStats);

// New user registration route
router.post('/users', UsersController.postNew);

export default router;
