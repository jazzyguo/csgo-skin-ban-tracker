import { DiscordMessage } from '../models';

export class DiscordMessageRepository {
    public static async createDiscordMessage(
        id: string,
        content: string,
        timestamp: Date
    ): Promise<void> {
        await DiscordMessage.create({ id, content, timestamp });
    }
}
