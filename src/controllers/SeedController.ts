import axios from 'axios';
import { Request, Response } from 'express';
import { DISCORD_AUTH_TOKEN } from '../config';
import { SeedService, DiscordMessage } from '../services/SeedService';
import { ProfileRepository } from '../repositories';

export class SeedController {
    public static async seedProfiles(
        req: Request,
        res: Response
    ): Promise<void> {
        const url =
            'https://discord.com/api/v10/channels/1092959474303635506/messages';
        const limit = 100;
        let before = '';

        try {
            while (true) {
                const response = await axios.get(
                    `${url}?limit=${limit}${before ? `&before=${before}` : ''}`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: DISCORD_AUTH_TOKEN,
                        },
                    }
                );

                const messages: DiscordMessage[] = response.data;

                if (!messages.length) {
                    break;
                }

                await SeedService.seedFromDiscordMessages(messages);

                before = messages[messages.length - 1].id;

                //break;
            }

            res.send('Profiles seeds completed');
        } catch (error) {
            console.error('Error seeding profiles:', error);
            res.status(500).send('Error seeding profiles');
        }
    }

    public static async seedInventories(
        req: Request,
        res: Response
    ): Promise<void> {
        try {
            const profiles = await ProfileRepository.findAll();

            await SeedService.seedInventories(profiles);

            res.send('Inventory seeds completed');
        } catch (error) {
            console.error('Error seeding inventories:', error);
            res.status(500).send('Error seeding inventories');
        }
    }

    public static async seedInventory(
        req: Request,
        res: Response
    ): Promise<void> {
        const { profileId } = req.params;

        const profile = await ProfileRepository.findAll({
            where: {
                id: profileId,
            },
        });

        try {
            await SeedService.seedInventories(profile);
            res.send('Inventory seeded successfully');
        } catch (error) {
            console.error(
                `Error seeding inventory for profile ${profileId}:`,
                error
            );
            res.status(500).send('Error seeding inventory');
        }
    }
}
