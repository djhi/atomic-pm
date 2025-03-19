import { faker } from "@faker-js/faker";

export const generateRevisions = ({
  boards,
  columns,
  cards,
}: {
  boards: any;
  cards: any;
  columns: any;
}) => {
  const revisions = [];
  let id = 1;
  for (const card of cards) {
    const column = columns.find((column: any) => column.id === card.column_id);
    const board = boards.find((board: any) => board.id === column.board_id);
    const user_id = board.user_id;
    const created_at = faker.date.soon({
      refDate: board.created_at,
      days: faker.helpers.rangeToNumber({ min: 1, max: 2 }),
    });

    revisions.push({
      id: id++,
      resource: "cards",
      recordId: card.id,
      authorId: user_id,
      date: created_at.toISOString(),
      message: '',
      data: card
    });
  }
  return revisions;
};
