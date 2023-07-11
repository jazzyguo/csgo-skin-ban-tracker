import { Request, Response } from 'express';
import { InventoryItemRepository } from '../repositories';

export class CountsController {
    public static async getAllCounts(
        req: Request,
        res: Response
    ): Promise<void> {
        try {
            const counts =
                await InventoryItemRepository.getCountOfAllBannedItems();
            res.json(counts);
        } catch (error) {
            console.error('Error retrieving counts:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}
