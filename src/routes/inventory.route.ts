import express from 'express';
import { InventoryController } from '../controllers/InventoryController';

export const inventoryRouter = express.Router();

inventoryRouter.delete('/inventory/:inventoryId', InventoryController.deleteInventory);
