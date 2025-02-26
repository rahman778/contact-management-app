import { seedContacts } from './seeds/ContactSeed';
import AppDataSource from '../../ormconfig';
async function runSeeds() {
  try {
    console.log('Data Source initialized.');
    await AppDataSource.initialize();
    console.log('Data Source initialized.');

    await seedContacts(AppDataSource);

    console.log('Seeding completed.');
  } catch (error) {
    console.error('Error during seeding:', error);
  } finally {
    await AppDataSource.destroy();
    console.log('Data Source destroyed.');
  }
}

runSeeds();
