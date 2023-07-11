import {
    Table,
    Column,
    Model,
    PrimaryKey,
    DataType,
    ForeignKey,
    BelongsTo,
    Default,
} from 'sequelize-typescript';
import { Profile } from './Profile.model';
import { DiscordMessage } from './DiscordMessage.model';

interface BanEventModelAttributes {
    id: string;
    isBanned: boolean;
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
    @Default(DataType.UUIDV4) 
    @Column(DataType.UUID)
    id!: string;

    @Column(DataType.BOOLEAN)
    isBanned!: boolean;

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
