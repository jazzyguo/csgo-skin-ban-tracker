import { Request, Response } from 'express';
import { CountsService } from '../services/CountsService';
import { KNIFE_FAMILIES } from '../lib/consts';

export class CountsController {
    /*
     * Returns counts by unique item skin
     */
    public static async getCountsForAllItems(
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
    public static async getCountsForKnives(
        req: Request,
        res: Response
    ): Promise<void> {
        try {
            const counts = await CountsService.getCountOfBannedItems({
                type: 'knife',
            });
            res.json(counts);
        } catch (error) {
            console.error('Error retrieving counts:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}
