import {
    Table,
    Column,
    Model,
    PrimaryKey,
    DataType,
    HasOne,
} from 'sequelize-typescript';
import { BanEvent } from './BanEvent.model';

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

    @HasOne(() => BanEvent)
    banEvent!: BanEvent;
}
