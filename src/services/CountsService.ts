import { ProfileRepository, InventoryRepository } from '../repositories';

export class CountsService {
    /**
     * Returns count of all/filtered items that have been banned, 
     * if an item is associated to an unbanned account then the count should go down
     */
    public static async getCountOfBannedItems({
        category = '',
        family = '',
    }: {
        category?: string;
        family?: string;
    }): Promise<{
        [key: string]: number;
    }> {
        try {
            const bannedProfiles = await ProfileRepository.getBannedProfiles();

            const unbannedProfiles =
                await ProfileRepository.getUnbannedProfiles();

            const counts: { [key: string]: number } = [
                ...bannedProfiles,
                ...unbannedProfiles,
            ].reduce(async (acc, profile) => {
                const inventory =
                    await InventoryRepository.findInventoryWithItemsByProfileId(
                        profile.id,
                        {
                            ...(category ? { category } : {}),
                            ...(family ? { family } : {}),
                        }
                    );

                const inventoryItems = inventory?.items;

                if (inventoryItems) {
                    const isBanned =
                        !!profile.banEvents[0] && profile.banEvents[0].isBanned;

                    for (const item of inventoryItems) {
                        acc[item.name] =
                            (acc[item.name] ?? 0) + (isBanned ? 1 : 0);
                    }
                }

                return acc;
            }, {});

            // sort by name
            const sortedCounts = {};

            const countKeys = Object.keys(counts).sort();

            countKeys.forEach((key) => {
                sortedCounts[key] = counts[key];
            });

            return sortedCounts;
        } catch (error) {
            console.error('Error retrieving counts:', error);
            throw new Error('An error occurred while retrieving counts');
        }
    }
}
