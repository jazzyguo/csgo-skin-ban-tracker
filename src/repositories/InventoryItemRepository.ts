import { InventoryItem } from '../models';
import { ITEM_CATEGORIES } from '../lib/consts';

export class InventoryItemRepository {
    public static async createInventoryItem(
        itemId: string,
        inventoryId: string,
        name: string
    ): Promise<void> {
        await InventoryItem.create({ itemId, inventoryId, name });
    }

    public static calculateCategoryAndFamilyFromName(name: string): {
        category: string;
        family: string;
    } {
        let category = '';
        let family = '';
        // .includes(' Pin')
        // .includes('Sticker ')
        // .includes(' Case')

        return {
            category,
            family,
        };
    }
}
