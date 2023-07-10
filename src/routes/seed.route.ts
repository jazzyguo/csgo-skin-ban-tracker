import express from 'express';
import { SeedController } from '../controllers/SeedController';

export const seedRouter = express.Router();

seedRouter.get('/seed/profiles', SeedController.seedProfiles);
