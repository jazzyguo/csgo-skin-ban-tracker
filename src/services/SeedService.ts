import {
    DiscordMessageRepository,
    BanEventRepository,
    ProfileRepository,
} from '../repositories';

export type DiscordMessage = {
    id: string;
    content: string;
    timestamp: Date;
};

export class SeedService {
    /**
     * Seeding Messages, BanEvents, and Profiles Table
     * @param messages
     */
    public static async seedFromDiscordMessages(
        messages: DiscordMessage[]
    ): Promise<void> {
        for (const message of messages) {
            try {
                const existingMessage = await DiscordMessageRepository.findById(
                    message.id
                );
                if (existingMessage) {
                    continue; // Skip if message with the same ID already exists
                }

                if (message.content) {
                    await DiscordMessageRepository.createDiscordMessage(
                        message.id,
                        message.content,
                        new Date(message.timestamp)
                    );

                    // Extract the profile ID from the message content
                    const profileId =
                        message.content.match(/profiles\/(\d+)/)?.[1];
                    const isBanned =
                        message.content.includes('Community Banned');

                    if (profileId) {
                        // Create a new profile with the extracted profile ID
                        await ProfileRepository.createProfile(profileId);

                        // Create a new BanEvent with isBanned status and the extracted profile ID
                        await BanEventRepository.createBanEvent(
                            profileId,
                            isBanned
                        );
                    }
                }
            } catch (error) {
                console.error(
                    `Error creating Discord message with ID ${message.id}:`,
                    error
                );
            }
        }
    }
}
