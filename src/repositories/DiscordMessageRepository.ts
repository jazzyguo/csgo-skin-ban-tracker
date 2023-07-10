import { DiscordMessage } from '../models';

export class DiscordMessageRepository {
    public static async createDiscordMessage(
        id: string,
        content: string,
        timestamp: Date
    ): Promise<void> {
        await DiscordMessage.create({ id, content, timestamp });
    }

    public static async findById(id: string): Promise<DiscordMessage | null> {
        const message = await DiscordMessage.findOne({ where: { id } });
        return message ? message : null;
    }
}
