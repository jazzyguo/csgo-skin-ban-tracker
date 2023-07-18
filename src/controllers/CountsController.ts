import { Request, Response } from 'express';
import { CountsService } from '../services/CountsService';

export class CountsController {
    /*
     * Returns counts by unique item skin
     */
    public static async getCountsForAllBannedItems(
        req: Request,
        res: Response
    ): Promise<void> {
        try {
            const counts = await CountsService.getCountOfBannedItems({});
            res.json(counts);
        } catch (error) {
            console.error('Error retrieving counts:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    /*
     * Returns counts by aggregated knife family, with wear rating
     */
    public static async getWearCountsForBannedKnivesByFamily(
        req: Request,
        res: Response
    ): Promise<void> {
        try {
            const counts = await CountsService.getWearCountsForBannedItemsByFamily(
                'knife'
            );
            res.json(counts);
        } catch (error) {
            console.error('Error retrieving counts:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}
