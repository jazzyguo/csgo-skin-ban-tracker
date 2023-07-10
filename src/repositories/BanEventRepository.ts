import { BanEvent } from '../models';

export class BanEventRepository {
    public static async createBanEvent(
        profileId: string,
        isBanned: boolean,
        discordMessageId: string
    ): Promise<void> {
        await BanEvent.create({ profileId, isBanned, discordMessageId });
    }
}
