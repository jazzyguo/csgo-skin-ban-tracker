import { InventoryItem, Type } from '../models';
import { ITEM_FAMILIES_BY_TYPE } from '../lib/consts';

export class InventoryItemRepository {
    public static async createInventoryItem(
        itemId: string,
        inventoryId: string,
        name: string
    ): Promise<void> {
        await InventoryItem.create({ itemId, inventoryId, name });
    }

    public static calculateTypeAndFamilyFromName(name: string): {
        type: string;
        family: string;
    } {
        let type = '';
        let family = '';

        if (name.includes(' Pin')) {
            type = 'pin';
            family = name;
        } else if (name.includes('Sticker ')) {
            type = 'sticker';
            family = name;
        } else if (name.includes(' Case')) {
            type = 'case';
            family = name;
        } else {
            const itemTypes = Object.keys(ITEM_FAMILIES_BY_TYPE);

            // search for the family name that matches
            for (const itemType of itemTypes) {
                const families: string[] = ITEM_FAMILIES_BY_TYPE[itemType];
                const foundFamily: string = families.find((family) =>
                    name.includes(family)
                );

                if (foundFamily) {
                    type = itemType;
                    family = foundFamily;
                    break;
                }
            }
        }

        return {
            type,
            family,
        };
    }
}
