import { Profile } from '../models';

export class ProfileRepository {
    public static async createProfile(id: string): Promise<void> {
        const existingProfile = await Profile.findOne({ where: { id } });
        if (!existingProfile) {
            await Profile.create({ id });
        }
    }

    public static async findAll(opts?: {}): Promise<Profile[]> {
        return await Profile.findAll(opts);
    }
}
