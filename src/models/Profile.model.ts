import {
    Table,
    Column,
    Model,
    PrimaryKey,
    HasOne,
    HasMany,
} from 'sequelize-typescript';
import { Inventory } from './Inventory.model';
import { BanEvent } from './BanEvent.model';

interface ProfileModelAttributes {
    id: string;
}

interface ProfileCreationAttributes extends ProfileModelAttributes {}

@Table
export class Profile extends Model<
    ProfileModelAttributes,
    ProfileCreationAttributes
> {
    @PrimaryKey
    @Column
    id!: string;

    @HasOne(() => Inventory)
    inventory!: Inventory;

    @HasMany(() => BanEvent)
    banEvents!: BanEvent[];
}
