import { faker } from '@faker-js/faker';
import { Mover } from '../../models/Mover';
import { Item } from '../../models/Item';

export async function clearAndGenerateData() {
  try {
    await Mover.deleteMany({});
    await Item.deleteMany({});

    const fakeMovers = Array.from({ length: 10 }, () => ({
      weightLimit: faker.datatype.number({ min: 100, max: 1000 }),
      energy: faker.datatype.number({ min: 10, max: 100 }),
      state: 'resting',
      currentLoad: 0,
      missionsCompleted: faker.datatype.number(),
    }));

    const fakeItems = Array.from({ length: 10 }, () => ({
      name: faker.commerce.productName(),
      weight: faker.datatype.number({ min: 1, max: 100 }),
    }));

    await Mover.insertMany(fakeMovers);
    await Item.insertMany(fakeItems);

    console.log('Fake data generated successfully.');
  } catch (error) {
    console.error('Error generating fake data:', error);
  }
}

clearAndGenerateData();
