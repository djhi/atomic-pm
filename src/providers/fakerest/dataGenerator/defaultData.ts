import { faker } from "@faker-js/faker";

export const defaultProfile = {
  id: 1,
  email: "janedoe@atomic.dev",
  password: "demo",
};

export const defaultBoard = {
  id: 1,
  created_at: faker.date.recent({ days: 30 }),
  user_id: defaultProfile.id,
  name: "Atomic PM",
  description: "A project management tool",
};

export const defaultColumns = [
  {
    id: 1,
    board_id: 1,
    name: "Backlog",
    position: 0,
  },
  {
    id: 2,
    board_id: 1,
    name: "In Progress",
    position: 1,
  },
  {
    id: 3,
    board_id: 1,
    name: "Done",
    position: 2,
  },
];

export const defaultCards = [
  {
    id: 5,
    column_id: 1,
    title: "Add board files",
    description: "Allow users to add files to board documents",
    position: 0,
    estimate: 1,
    number: 5,
  },
  {
    id: 4,
    column_id: 2,
    title: "Allow card attachments",
    description: "Allow users to add files to cards",
    position: 0,
    estimate: 1,
    number: 4,
  },
  {
    id: 3,
    column_id: 3,
    title: "Add board documents",
    description: "Allow users to add documents to boards",
    position: 0,
    estimate: 1,
    number: 3,
  },
  {
    id: 2,
    column_id: 3,
    title: "Allow to drag and drop cards and columns",
    description: "Implement drag and drop feature for cards and columns",
    position: 0,
    estimate: 1,
    number: 2,
  },
  {
    id: 1,
    column_id: 3,
    title: "Basic board",
    description: "Implement basic boards with columns and cards",
    position: 1,
    estimate: 5,
    number: 1,
  },
];

export const defaultDocuments: any[] = [
  {
    id: 1,
    board_id: 1,
    title: "Ubiquitous Language",
    content: `<h1>Ubiquitous Language</h1>
    <ul>
      <li><b>Board</b>: Users can have many boards and invite people to collaborate on it. A board may contain many columns and documents.</li>
      <li><b>Document</b>: A document that is attached to a board.</li>
      <li><b>Column</b>: A way to organize elements in a board. Can be reordered and may contain many cards.</li>
      <li><b>Card</b>: An item in a board. Can be reordered and moved between columns</li>
    </ul>`, 
    favorite: true,
  },
];