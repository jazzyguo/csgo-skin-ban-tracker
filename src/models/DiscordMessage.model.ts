import { Table, Column, Model, PrimaryKey, DataType } from 'sequelize-typescript';

interface DiscordMessageModelAttributes {
    id: string;
    timestamp: Date;
    content: string;
}

interface DiscordMessageCreationAttributes
    extends DiscordMessageModelAttributes {}

@Table
export class DiscordMessage extends Model<
    DiscordMessageModelAttributes,
    DiscordMessageCreationAttributes
> {
    @PrimaryKey
    @Column
    id!: string;

    @Column(DataType.TEXT)
    content!: string;

    @Column
    timestamp!: Date;
}
