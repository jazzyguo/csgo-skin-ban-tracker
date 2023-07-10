import {
    Table,
    Column,
    Model,
    PrimaryKey,
    ForeignKey,
    BelongsTo,
} from 'sequelize-typescript';
import { Inventory } from './Inventory.model';

interface SkinModelAttributes {
    id: string;
    inventoryId: string;
    name: string;
}

interface SkinCreationAttributes extends SkinModelAttributes {}

@Table
export class Skin extends Model<SkinModelAttributes, SkinCreationAttributes> {
    @PrimaryKey
    @Column
    id!: string;

    @ForeignKey(() => Inventory)
    @Column
    inventoryId!: string;

    @Column
    name!: string;

    @BelongsTo(() => Inventory)
    inventory!: Inventory;
}
