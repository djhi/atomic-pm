import { mergeTranslations } from "react-admin";
import { raSupabaseEnglishMessages } from "ra-supabase-language-english";
import raEnglishMessages from "ra-language-english";
import { raRealTimeLanguageEnglish } from "@react-admin/ra-realtime";

export const englishMessages = mergeTranslations(
  raEnglishMessages,
  raSupabaseEnglishMessages,
  raRealTimeLanguageEnglish,
  {
    pm: {
      documents: "Documents",
      members: "Members",
      invitations: "Invitations",
      boards: "Boards",
      newBoard: "New board",
      newColumn: "New column",
      newCard: "New card",
      cardCount: "1 card |||| %{smart_count} cards",
      pointCount: "1 point |||| %{smart_count} points",
      cardCountWithLimit:
        "%{value} / 1 card |||| %{value} / %{smart_count} cards",
      pointCountWithLimit:
        "%{value} / 1 point |||| %{value} / %{smart_count} points",
      locked: "Locked by %{name}",
      sendMessage: "Send",
      editProfile: "Profile",
      actionList: "Action list",
    },
  },
);
