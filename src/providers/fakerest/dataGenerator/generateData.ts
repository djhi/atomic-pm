import { generateBoardMembers } from "./generateBoardMembers";
import { generateBoardMembersWithProfiles } from "./generateBoardMembersWithProfiles";
import { generateBoards } from "./generateBoards";
import { generateCardEvents } from "./generateCardEvents";
import { generateCards } from "./generateCards";
import { generateColumns } from "./generateColumns";
import { generateDocuments } from "./generateDocuments";
import { generateProfiles } from "./generateProfiles";
import { generateRevisions } from "./generateRevisions";

export const generateData = () => {
  const profiles = generateProfiles();
  const boards = generateBoards(profiles);
  const board_members = generateBoardMembers({ boards, profiles });
  const columns = generateColumns(boards);
  const cards = generateCards(columns);
  const documents = generateDocuments(boards);
  const revisions = generateRevisions({ boards, columns, cards });
  const card_events = generateCardEvents({ revisions });

  return {
    profiles,
    boards,
    board_members,
    board_members_with_profiles: generateBoardMembersWithProfiles({
      board_members,
      profiles,
    }),
    columns,
    cards,
    locks: [],
    revisions,
    comments: [],
    invitations: [],
    card_events,
    documents,
  };
};
