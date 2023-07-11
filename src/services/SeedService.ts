import {
    DiscordMessageRepository,
    BanEventRepository,
    ProfileRepository,
    InventoryRepository,
    InventoryItemRepository,
} from '../repositories';
import { STEAM_WEB_KEY } from '../config';
import axios from 'axios';
import { Profile } from '../models';

export type DiscordMessage = {
    id: string;
    content: string;
    timestamp: Date;
};

type Item = {
    id: string;
    marketName: string;
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
                            isBanned,
                            message.id
                        );
                    }
                }
            } catch (error) {
                console.error(
                    `Error seeding tables with message ID ${message.id}:`,
                    error
                );
            }
        }
    }

    /**
     * Seeding Inventories and InventoryItems
     * @param profiles
     */
    public static async seedInventories(profiles: Profile[]): Promise<void> {
        for (const profile of profiles) {
            try {
                const existingInventory =
                    InventoryItemRepository.findInventoryByProfileId(
                        profile.id
                    );

                if (existingInventory) {
                    continue; // Skip if inventory with the same profile Id already exists
                }

                // Fetch inventory data from API
                const inventoryItems = await this.fetchInventoryData(
                    profile.id
                );

                // Create an inventory for the profile
                const inventory = await InventoryRepository.createInventory(
                    profile.id
                );

                // Create inventory items for each item in the array
                for (const item of inventoryItems) {
                    await InventoryItemRepository.createInventoryItem(
                        item.id,
                        inventory.id,
                        item.marketName
                    );
                }
            } catch (error) {
                console.error(
                    `Error seeding inventory for profile ID ${profile.id}:`,
                    error
                );
            }
        }
    }

    /**
     * Fetch inventory data from steam web API using the profile ID
     * @param profileId
     * @returns Array of items
     */
    private static async fetchInventoryData(
        profileId: string
    ): Promise<Item[]> {
        // Make the API call to fetch inventory data
        const response = await axios.get(
            `https://www.steamwebapi.com/steam/api/inventory?key=${STEAM_WEB_KEY}&steam_id=${profileId}`
        );

        if (response.status !== 200) {
            throw new Error(
                `Failed to fetch inventory data for profile ${profileId}`
            );
        }

        const { data } = response;

        const items: Item[] = data.map((item: Item) => ({
            id: item.id,
            marketName: item.marketName,
        }));

        return items;
    }
}
