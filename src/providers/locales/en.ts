import { mergeTranslations } from "react-admin";
import { raSupabaseEnglishMessages } from "ra-supabase-language-english";
import raEnglishMessages from "ra-language-english";
import { raRealTimeLanguageEnglish } from "@react-admin/ra-realtime";
import { raFormLayoutLanguageEnglish } from "@react-admin/ra-form-layout";
export const englishMessages = mergeTranslations(
  raEnglishMessages,
  raSupabaseEnglishMessages,
  raRealTimeLanguageEnglish,
  raFormLayoutLanguageEnglish,
  {
    resources: {
      cards: {
        fields: {
          title: "Title",
          estimate: "Estimation",
          column_id: "Column",
          description: "Description",
          assigned_user_id: "Assigned user",
        },
      },
      columns: {
        fields: {
          name: "Name",
          maxCards: "Maximum cards",
          maxEstimates: "Maximum points",
        },
      },
      boards: {
        name: "Board |||| Boards",
        fields: {
          name: "Name",
        },
      },
    },
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
      sendMessageInstructions: "CTRl+Enter to send",
      sendMessage: "Send",
      editProfile: "Profile",
      actionList: "Action list",
    },
  },
);
