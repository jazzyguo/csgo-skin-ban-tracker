import { Request, Response } from 'express';
import { InventoryRepository } from '../repositories';

export class InventoryController {
    public static async deleteInventory(
        req: Request,
        res: Response
    ): Promise<void> {
        try {
            const { inventoryId } = req.params;
            await InventoryRepository.deleteInventory(inventoryId);
            res.send('Inventory deleted');
        } catch (error) {
            console.error('Error deleting inventory:', error);
            res.status(500).send('Error deleting inventory');
        }
    }
}
