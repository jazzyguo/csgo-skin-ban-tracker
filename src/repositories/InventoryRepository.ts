import { Inventory, InventoryItem } from '../models';

export class InventoryRepository {
    public static async createInventory(profileId: string): Promise<Inventory> {
        const inventory = await Inventory.create({ profileId });
        return inventory;
    }

    public static async findInventoryByProfileId(
        profileId: string
    ): Promise<Inventory> {
        const inventory = await Inventory.findOne({
            where: { profileId },
        });
        return inventory;
    }

    public static async deleteInventory(inventoryId: string): Promise<void> {
        // Delete all associated inventory items
        await InventoryItem.destroy({ where: { inventoryId } });

        // Delete the inventory itself
        await Inventory.destroy({ where: { id: inventoryId } });
    }
}
