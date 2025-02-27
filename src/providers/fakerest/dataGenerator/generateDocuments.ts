import { faker } from "@faker-js/faker";
import { defaultDocuments } from "./defaultData";
import { generateRichTextContent } from "./generateRichTextContent";

export const generateDocuments = (boards: any[]) => {
  const documents = [...defaultDocuments];
  let id = defaultDocuments.length;
  for (let i = 1; i < boards.length; i++) {
    for (let j = 0; j < faker.helpers.rangeToNumber({ min: 3, max: 6 }); j++) {
      id++;
      const title = faker.book.title();
      documents.push({
        id,
        board_id: boards[i].id,
        title,
        favorite: faker.datatype.boolean(),
        content: generateRichTextContent(title),
      });
    }
  }
  return documents;
};
