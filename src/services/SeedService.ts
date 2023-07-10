import { DiscordMessageRepository } from '../repositories/DiscordMessageRepository';

export type DiscordMessage = {
    id: string;
    content: string;
    timestamp: Date;
};

export class SeedService {
    public static async seedDiscordMessagesFromArray(
        messages: DiscordMessage[]
    ): Promise<void> {
        for (const message of messages) {
            try {
                await DiscordMessageRepository.createDiscordMessage(
                    message.id,
                    message.content,
                    new Date(message.timestamp)
                );
            } catch (error) {
                console.error(
                    `Error creating Discord message with ID ${message.id}:`,
                    error
                );
            }
        }
    }
}
