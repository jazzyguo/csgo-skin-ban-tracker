import {
    Table,
    Column,
    Model,
    PrimaryKey,
    ForeignKey,
    BelongsTo,
    DataType,
    Default,
    BeforeCreate,
} from 'sequelize-typescript';
import { Inventory } from './Inventory.model';
import { InventoryItemService } from '../services/InventoryItemService';

export type ItemType =
    | 'glove'
    | 'heavy'
    | 'knife'
    | 'pistol'
    | 'rifle'
    | 'smg'
    | 'sticker'
    | 'case'
    | 'pin'
    | 'graffiti'
    | '';

export type ItemWear =
    | 'factory new'
    | 'minimal wear'
    | 'field-tested'
    | 'well-worn'
    | 'battle-scarred'
    | '';

export interface InventoryItemModelAttributes {
    id: string;
    itemId: string;
    inventoryId: string;
    name: string;
    type: ItemType;
    family: string;
    wear: ItemWear;
}

interface InventoryItemCreationAttributes
    extends InventoryItemModelAttributes {}

@Table
export class InventoryItem extends Model<
    InventoryItemModelAttributes,
    InventoryItemCreationAttributes
> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id!: string;

    @Column
    itemId!: string;

    @ForeignKey(() => Inventory)
    @Column({
        type: DataType.UUID,
    })
    inventoryId!: string;

    @Column
    name!: string;

    @Column
    type: ItemType;

    @Column
    family: string;

    @Column
    wear: ItemWear;

    @BelongsTo(() => Inventory)
    inventory!: Inventory;

    @BeforeCreate
    static calculateInfoFromName(instance: InventoryItem): void {
        const { type, family } =
            InventoryItemService.calculateTypeAndFamilyFromName(instance.name);

        const wear = InventoryItemService.calculateWearFromName(instance.name);

        instance.type = type;
        instance.family = family;
        instance.wear = wear;
    }
}
