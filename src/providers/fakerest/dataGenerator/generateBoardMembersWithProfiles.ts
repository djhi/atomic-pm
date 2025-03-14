export const generateBoardMembersWithProfiles = ({
  board_members,
  profiles,
}: {
  board_members: any[];
  profiles: any[];
}) => {
  return board_members.map((board_member) => {
    const { id, ...profile } = profiles.find(
      (profile) => profile.id === board_member.user_id,
    );

    return {
      ...board_member,
      ...profile,
    };
  });
};
