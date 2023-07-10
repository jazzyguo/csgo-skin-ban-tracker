import {
    Table,
    Column,
    Model,
    PrimaryKey,
    ForeignKey,
    BelongsTo,
} from 'sequelize-typescript';
import { Profile } from './Profile.model';

interface InventoryModelAttributes {
    id: string;
    profileId: string;
}

interface InventoryCreationAttributes extends InventoryModelAttributes {}

@Table
export class Inventory extends Model<
    InventoryModelAttributes,
    InventoryCreationAttributes
> {
    @PrimaryKey
    @Column
    id!: string;

    @ForeignKey(() => Profile)
    @Column
    profileId!: string;

    @BelongsTo(() => Profile)
    profile!: Profile;
}
