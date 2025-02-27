import { faker } from "@faker-js/faker";
import { defaultColumns } from "./defaultData";

export const generateColumns = (boards: any[]) => {
  const columns = [...defaultColumns];

  let id = defaultColumns.length;
  for (let i = 1; i < boards.length; i++) {
    let position = 0;
    for (let j = 0; j < faker.helpers.rangeToNumber({ min: 3, max: 6 }); j++) {
      id++;
      columns.push({
        id,
        board_id: boards[i].id,
        name: faker.company.catchPhrase(),
        position: position++,
      });
    }
  }

  return columns;
};
