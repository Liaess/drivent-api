import faker from "faker";

import Location from "../../src/entities/Location";

export async function createLocations(quantity: number) {
  const locations = [];

  for (let i = 0; i < quantity; i++) {
    const location = Location.create({
      name: faker.random.words(),
    });

    const newOne = await location.save();

    locations.push(newOne);
  }

  return locations;
}
