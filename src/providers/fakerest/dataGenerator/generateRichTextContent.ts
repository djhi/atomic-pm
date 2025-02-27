import { faker } from "@faker-js/faker";

export const generateRichTextContent = (title: string) => {
  return `<h1>${title}</h1>${Array.from(
    { length: faker.helpers.rangeToNumber({ min: 1, max: 20 }) },
    () =>
      faker.lorem.paragraphs(faker.helpers.rangeToNumber({ min: 1, max: 10 })),
  )
    .map((paragraph) => `<h2>${faker.book.title()}</h2><p>${paragraph}</p>`)
    .join("")}`;
};
