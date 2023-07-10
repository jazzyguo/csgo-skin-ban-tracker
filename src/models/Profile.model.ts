import { Table, Column, Model, PrimaryKey } from 'sequelize-typescript';

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
}
