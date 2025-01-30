import { http } from "msw";
import { setupWorker } from "msw/browser";
import { getMswHandler, withDelay } from "fakerest";
import { users } from "./users.json";

const handler = getMswHandler({
  baseUrl: import.meta.env.VITE_SIMPLE_REST_URL,
  middlewares: [withDelay(300)],
  data: {
    users,
    boards: [
      { id: 1, user_id: 1, name: "React-admin" },
      { id: 2, user_id: 2, name: "Atomic PM" },
    ],
    board_members: [
      { id: 1, board_id: 1, user_id: 1 },
      { id: 2, board_id: 2, user_id: 1 },
      { id: 3, board_id: 2, user_id: 2 },
    ],
    columns: [
      {
        id: 1,
        board_id: 1,
        name: "Backlog",
        created_by: 1,
        created_at: new Date().toISOString(),
      },
    ],
    cards: [
        {
            id: 1,
            column_id: 1,
            title: "Task 1",
            description: "Do something",
            created_by: 1,
            created_at: new Date().toISOString(),
        }
    ]
  },
});

export const worker = setupWorker(
  // Make sure you use a RegExp to target all calls to the API
  http.all(new RegExp(import.meta.env.VITE_SIMPLE_REST_URL), handler),
);
