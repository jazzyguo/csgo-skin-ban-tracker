import express from 'express';
import { CountsController } from '../controllers/CountsController';

export const countsRouter = express.Router();

countsRouter.get('/counts/all', CountsController.getAllCounts);
