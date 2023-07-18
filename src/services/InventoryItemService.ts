import {
    ITEM_FAMILIES_BY_TYPE,
    FIELD_TESTED_STRING,
    FACTORY_NEW_STRING,
    MINIMAL_WEAR_STRING,
    WELL_WORN_STRING,
    BATTLE_SCARRED_STRING,
} from '../lib/consts';
import { ItemWear, ItemType } from '../models';

export class InventoryItemService {
    public static calculateTypeAndFamilyFromName(name: string): {
        type: ItemType;
        family: string;
    } {
        let type: ItemType = '';
        let family = '';

        const nameInLowerCase = name.toLocaleLowerCase();

        if (nameInLowerCase.includes(' pin')) {
            type = 'pin';
            family = name;
        } else if (nameInLowerCase.includes('sticker ')) {
            type = 'sticker';
            family = name;
        } else if (nameInLowerCase.includes(' case')) {
            type = 'case';
            family = name;
        } else {
            const itemTypes: ItemType[] = [
                'glove',
                'heavy',
                'knife',
                'rifle',
                'smg',
                'pistol',
            ];

            // search for the family name that matches
            for (const itemType of itemTypes) {
                const families: string[] = ITEM_FAMILIES_BY_TYPE[itemType];
                const foundFamily: string = families.find((family) =>
                    nameInLowerCase.includes(family.toLocaleLowerCase())
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

    public static calculateWearFromName(name: string): ItemWear {
        let wear: ItemWear = '';

        const nameInLowerCase = name.toLocaleLowerCase();

        const wearStrings: ItemWear[] = [
            FIELD_TESTED_STRING,
            FACTORY_NEW_STRING,
            MINIMAL_WEAR_STRING,
            WELL_WORN_STRING,
            BATTLE_SCARRED_STRING,
        ];

        wearStrings.forEach((wearString) => {
            if (nameInLowerCase.includes(wearString)) {
                wear = wearString;
            }
        });

        return wear;
    }
}
