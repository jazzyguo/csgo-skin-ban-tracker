import { Request, Response } from 'express';
import { AUTH_TOKEN } from '../config';
import { SeedService, DiscordMessage } from '../services/SeedService';
import axios from 'axios';

export class SeedController {
    public static async seedDiscordMessages(
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
                            Authorization: AUTH_TOKEN,
                        },
                    }
                );

                const messages: DiscordMessage[] = response.data;

                if (!messages.length) {
                    break;
                }

                await SeedService.seedDiscordMessagesFromArray(messages);

                before = messages[messages.length - 1].id;
            }

            res.send('Seed Discord messages completed');
        } catch (error) {
            console.error('Error seeding Discord messages:', error);
            res.status(500).send('Error seeding Discord messages');
        }
    }
}
