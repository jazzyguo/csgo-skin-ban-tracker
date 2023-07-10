import {
    Table,
    Column,
    Model,
    PrimaryKey,
    DataType,
    ForeignKey,
    BelongsTo,
} from 'sequelize-typescript';
import { Profile } from './Profile.model';
import { DiscordMessage } from './DiscordMessage.model';

interface BanEventModelAttributes {
    id: string;
    is_banned: boolean;
    profileId: string;
    discordMessageId: string;
}

interface BanEventCreationAttributes extends BanEventModelAttributes {}

@Table
export class BanEvent extends Model<
    BanEventModelAttributes,
    BanEventCreationAttributes
> {
    @PrimaryKey
    @Column
    id!: string;

    @Column(DataType.BOOLEAN)
    is_banned!: boolean;

    @ForeignKey(() => Profile)
    @Column
    profileId!: string;

    @ForeignKey(() => DiscordMessage)
    @Column
    discordMessageId!: string;

    @BelongsTo(() => Profile)
    profile!: Profile;

    @BelongsTo(() => DiscordMessage)
    discordMessage!: DiscordMessage;
}
