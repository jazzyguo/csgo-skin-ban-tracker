import { Profile, BanEvent, InventoryItem, Inventory } from '../models';

export class ProfileRepository {
    public static async createProfile(id: string): Promise<void> {
        const existingProfile = await Profile.findOne({ where: { id } });
        if (!existingProfile) {
            await Profile.create({ id });
        }
    }

    public static async findAll(opts?: {}): Promise<Profile[]> {
        return await Profile.findAll(opts);
    }

    // Fetch all banned profiles using most recent BanEvent
    public static async getBannedProfiles(): Promise<Profile[]> {
        const bannedProfiles = await Profile.findAll({
            include: [
                {
                    model: BanEvent,
                    where: {
                        isBanned: true,
                    },
                    order: [['createdAt', 'DESC']],
                    limit: 1,
                    required: true,
                },
            ],
        });
        return bannedProfiles;
    }

    // Fetch all unbanned profiles using most recent BanEvent
    public static async getUnbannedProfiles(): Promise<Profile[]> {
        const unbannedProfiles = await Profile.findAll({
            include: [
                {
                    model: BanEvent,
                    where: {
                        isBanned: false,
                    },
                    order: [['createdAt', 'DESC']],
                    limit: 1,
                    required: true,
                },
            ],
        });
        return unbannedProfiles;
    }
}
