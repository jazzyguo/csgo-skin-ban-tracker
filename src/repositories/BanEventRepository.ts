import { BanEvent } from '../models';

export class BanEventRepository {
    public static async createBanEvent(
        profileId: string,
        isBanned: boolean
    ): Promise<void> {
        await BanEvent.create({ profileId, isBanned });
    }
}
