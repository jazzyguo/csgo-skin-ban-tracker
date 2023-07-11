import express from 'express';
import { SeedController } from '../controllers/SeedController';

export const seedRouter = express.Router();

seedRouter.get('/seed/profiles', SeedController.seedProfiles);
seedRouter.get('/seed/inventories', SeedController.seedInventories);
seedRouter.get('/seed/inventories/:profileId', SeedController.seedInventory);
