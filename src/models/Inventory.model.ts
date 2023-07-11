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
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id!: string;

    @ForeignKey(() => Profile)
    @Column
    profileId!: string;

    @BelongsTo(() => Profile)
    profile!: Profile;
}
