import { InventoryItem } from '../models';

export class InventoryItemRepository {
    public static async createInventoryItem({
        itemId,
        inventoryId,
        name,
        category,
        family,
    }: {
        itemId: string;
        inventoryId: string;
        name: string;
        category: string;
        family: string;
    }): Promise<void> {
        await InventoryItem.create({
            itemId,
            inventoryId,
            name,
            category,
            family,
        });
    }
}
