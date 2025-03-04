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
      newColumn: "New column",
      newCard: "New card",
      cardCount: "1 card |||| %{smart_count} cards",
      pointCount: "1 point |||| %{smart_count} points",
      cardCountWithLimit:
        "%{cards} / 1 card |||| %{cards} / %{smart_count} cards",
      pointCountWithLimit:
        "%{points} / 1 point |||| %{points} / %{smart_count} points",
      locked: "Locked by %{name}",
    },
  },
);
