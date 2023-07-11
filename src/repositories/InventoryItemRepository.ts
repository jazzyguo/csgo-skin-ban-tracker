import { InventoryItem } from '../models';

export class InventoryItemRepository {
    public static async createInventoryItem(
        itemId: string,
        inventoryId: string,
        name: string
    ): Promise<void> {
        await InventoryItem.create({ itemId, inventoryId, name });
    }
}
