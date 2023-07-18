import {
    Table,
    Column,
    Model,
    PrimaryKey,
    ForeignKey,
    BelongsTo,
    DataType,
    Default,
} from 'sequelize-typescript';
import { Inventory } from './Inventory.model';

interface InventoryItemModelAttributes {
    id: string;
    itemId: string;
    inventoryId: string;
    name: string;
    category: string;
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
    category: string;

    @Column
    family: string;

    @BelongsTo(() => Inventory)
    inventory!: Inventory;
}
