import { Request, Response } from 'express';

export class SeedController {
    public static seedDiscordMessages(req: Request, res: Response): void {
        // Perform any necessary logic here
        // ...

        // Return a string response
        const message = 'Seed Discords messages completed';
        res.send(message);
    }
}
