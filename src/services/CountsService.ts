import { ProfileRepository, InventoryRepository } from '../repositories';
import {
    BATTLE_SCARRED_STRING,
    FACTORY_NEW_STRING,
    FIELD_TESTED_STRING,
    ITEM_FAMILIES_BY_TYPE,
    MINIMAL_WEAR_STRING,
    WELL_WORN_STRING,
} from '../lib/consts';
import { ItemWear, InventoryItemModelAttributes } from '../models';

type WearCounts = {
    'factory new': number;
    'minimal wear': number;
    'field-tested': number;
    'well-worn': number;
    'battle-scarred': number;
};

export class CountsService {
    /**
     * Returns count of all/filtered items that have been banned,
     * if an item is associated to an unbanned account then the count should go down
     */
    public static async getCountOfBannedItems(
        where: Partial<InventoryItemModelAttributes>
    ): Promise<{
        [key: string]: number;
    }> {
        try {
            const bannedProfiles = await ProfileRepository.getBannedProfiles();

            const unbannedProfiles =
                await ProfileRepository.getUnbannedProfiles();

            const counts: { [key: string]: number } = {};

            for (const profile of [...bannedProfiles, ...unbannedProfiles]) {
                const inventory =
                    await InventoryRepository.findInventoryWithItemsByProfileId(
                        profile.id,
                        where
                    );

                const inventoryItems = inventory?.items;

                if (inventoryItems) {
                    const isBanned =
                        !!profile.banEvents[0] && profile.banEvents[0].isBanned;

                    for (const item of inventoryItems) {
                        counts[item.name] =
                            (counts[item.name] ?? 0) + (isBanned ? 1 : 0);
                    }
                }
            }
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

    /**
     * Returns counts of individual wear rating for each family under the specified familyType
     */
    public static async getWearCountsForBannedItemsByFamily(
        familyType = 'all'
    ): Promise<{
        [family: string]: WearCounts;
    }> {
        let familiesToCalculate: string[] = [];

        if (familyType === 'all') {
            // push all families
            familiesToCalculate = Object.values(ITEM_FAMILIES_BY_TYPE).flat();
        } else {
            const itemTypes = Object.keys(ITEM_FAMILIES_BY_TYPE);
            const itemType = itemTypes.find((t) => t === familyType);
            familiesToCalculate = ITEM_FAMILIES_BY_TYPE[itemType];
        }

        // for each family, we query for the count for the specific family and wear rating
        try {
            const wears: ItemWear[] = [
                FIELD_TESTED_STRING,
                FACTORY_NEW_STRING,
                MINIMAL_WEAR_STRING,
                WELL_WORN_STRING,
                BATTLE_SCARRED_STRING,
            ];

            const results = {};

            for (const family of familiesToCalculate) {
                results[family] = results[family] || {};

                for (const wear of wears) {
                    const counts = await this.getCountOfBannedItems({
                        wear,
                        family,
                    });

                    // add up all the counts
                    const sumCounts = Object.values(counts).reduce(
                        (acc, value) => acc + value,
                        0
                    );

                    results[family][wear] = sumCounts;
                }
            }

            return results;
        } catch (error) {
            console.error('Error retrieving counts:', error);
            throw new Error('An error occurred while retrieving counts');
        }
    }
}
