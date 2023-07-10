import { Profile } from '../models';

async function seed() {
    await Profile.sync({ force: true });
    await Profile.bulkCreate([{ id: '1' }, { id: '1' }]);
}

seed()
    .then(() => {
        console.log('Seeding completed.');
        process.exit(0);
    })
    .catch((error) => {
        console.error('Seeding failed:', error);
        process.exit(1);
    });
