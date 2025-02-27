import { faker } from "@faker-js/faker";
import { defaultCards } from "./defaultData";

export const generateCards = (columns: any[]) => {
  const cards = [...defaultCards];

  let id = defaultCards.length;
  for (let i = 3; i < columns.length; i++) {
    let position = 0;
    for (let j = 0; j < faker.helpers.rangeToNumber({ min: 3, max: 6 }); j++) {
      id++;
      cards.push({
        id,
        column_id: columns[i].id,
        title: faker.company.catchPhrase(),
        description: faker.lorem.paragraphs(
          faker.helpers.rangeToNumber({ min: 1, max: 8 }),
        ),
        position: position++,
        estimate: faker.helpers.rangeToNumber({ min: 1, max: 8 }),
      });
    }
  }

  return cards;
};
