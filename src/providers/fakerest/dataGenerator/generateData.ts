import { generateBoards } from "./generateBoards";
import { generateCards } from "./generateCards";
import { generateColumns } from "./generateColumns";
import { generateDocuments } from "./generateDocuments";
import { generateProfiles } from "./generateProfiles";

export const generateData = () => {
  const profiles = generateProfiles();
  const boards = generateBoards(profiles);
  const columns = generateColumns(boards);
  const cards = generateCards(columns);
  const documents = generateDocuments(boards);

  return {
    profiles,
    boards,
    columns,
    cards,
    locks: [],
    revisions: [],
    comments: [],
    invitations: [],
    documents
  };
};
