import {
    Table,
    Column,
    Model,
    PrimaryKey,
    CreatedAt,
    UpdatedAt,
} from 'sequelize-typescript';

interface ProfileModelAttributes {
    id: string;
    createdAt: Date;
    updatedAt: Date;
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

    @CreatedAt
    @Column
    createdAt!: Date;

    @UpdatedAt
    @Column
    updatedAt!: Date;
}
