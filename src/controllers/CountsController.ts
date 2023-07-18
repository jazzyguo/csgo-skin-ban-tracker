import { Request, Response } from 'express';
import { CountsService } from '../services/CountsService';

export class CountsController {
    public static async getAllCounts(
        req: Request,
        res: Response
    ): Promise<void> {
        try {
            const counts = await CountsService.getCountOfAllBannedItems({});
            res.json(counts);
        } catch (error) {
            console.error('Error retrieving counts:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}
