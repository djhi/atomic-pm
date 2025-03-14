import { generateBoardMembers } from "./generateBoardMembers";
import { generateBoardMembersWithProfiles } from "./generateBoardMembersWithProfiles";
import { generateBoards } from "./generateBoards";
import { generateCards } from "./generateCards";
import { generateColumns } from "./generateColumns";
import { generateDocuments } from "./generateDocuments";
import { generateProfiles } from "./generateProfiles";

export const generateData = () => {
  const profiles = generateProfiles();
  const boards = generateBoards(profiles);
  const board_members = generateBoardMembers({ boards, profiles });
  const columns = generateColumns(boards);
  const cards = generateCards(columns);
  const documents = generateDocuments(boards);

  return {
    profiles,
    boards,
    board_members,
    board_members_with_profiles: generateBoardMembersWithProfiles({ board_members, profiles }),
    columns,
    cards,
    locks: [],
    revisions: [],
    comments: [],
    invitations: [],
    card_events: [],
    documents,
  };
};
