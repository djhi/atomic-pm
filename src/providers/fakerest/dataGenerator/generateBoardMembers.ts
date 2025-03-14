export const generateBoardMembers = ({
  boards,
  profiles,
}: {
  boards: any[];
  profiles: any[];
}) => {
  const board_members: any[] = [];
  let id = 0;
  for (const board of boards) {
    const owner = profiles.find((profile) => profile.id === board.user_id);
    board_members.push({
      id: id++,
      board_id: board.id,
      user_id: owner.id,
    });
  }
  return board_members;
};
