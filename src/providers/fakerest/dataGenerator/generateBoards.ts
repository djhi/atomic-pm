import { faker } from "@faker-js/faker";
import { defaultBoard } from "./defaultData";

export const generateBoards = (profiles: any[]) => {
  const boards = [defaultBoard];

  let id = 2;
  for (const profile of profiles) {
    for (let i = 0; i < faker.helpers.rangeToNumber({ min: 1, max: 3 }); i++) {
      id++;
      boards.push({
        id,
        created_at: faker.date.recent({
          days: faker.helpers.rangeToNumber({ min: 1, max: 30 }),
        }),
        user_id: profile.id,
        name: `${faker.commerce.productAdjective()} ${faker.commerce.productName()}`,
        description: faker.company.buzzPhrase(),
      });
    }
  }

  return boards;
};
