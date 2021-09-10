import Activity from "../../src/entities/Activity";

import { createLocations } from "./locationFactory";

export async function createActivities() {
  const locations = await createLocations(3);

  const activityBodies = [
    {
      date: "2021-09-28 00:00:00",
      title: "Bootbar",
      beginsAt: "9:00",
      finishesAt: "12:00",
      remainingSeats: 15,
      locationId: locations[0].id,
    },
    {
      date: "2021-09-29 00:00:00",
      title: "Bootbar 2",
      beginsAt: "10:00",
      finishesAt: "11:00",
      remainingSeats: 13,
      locationId: locations[1].id,
    },
    {
      date: "2021-09-27 00:00:00",
      title: "Bootbar 3",
      beginsAt: "9:00",
      finishesAt: "12:00",
      remainingSeats: 15,
      locationId: locations[2].id,
    },
    {
      date: "2021-09-29 00:00:00",
      title: "Bootbar 4",
      beginsAt: "13:00",
      finishesAt: "14:00",
      remainingSeats: 13,
      locationId: locations[0].id,
    },
  ];

  for (let i = 0; i < activityBodies.length; i++) {
    const activity = Activity.create(activityBodies[i]);

    await activity.save();
  }

  return locations;
}
