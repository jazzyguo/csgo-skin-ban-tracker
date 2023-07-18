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

export type Type =
    | 'glove'
    | 'heavy'
    | 'knife'
    | 'pistol'
    | 'rifle'
    | 'smg'
    | 'sticker'
    | 'case'
    | 'pin'
    | '';

interface InventoryItemModelAttributes {
    id: string;
    itemId: string;
    inventoryId: string;
    name: string;
    type: Type;
    family: string;
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
    type: string;

    @Column
    family: string;

    @BelongsTo(() => Inventory)
    inventory!: Inventory;

    @BeforeCreate
    static calculateTypeAndFamily(instance: InventoryItem): void {
        const { type, family } =
            InventoryItemService.calculateTypeAndFamilyFromName(instance.name);

        instance.type = type;
        instance.family = family;
    }
}
