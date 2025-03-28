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
    ra: {
      action: {
        toggle_theme: "Light/dark mode",
        more: "Actions list",
      },
      message: {
        delete_title: "Delete %{name} %{id}",
      },
    },
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
      document_drop_instructions: "Drop a file here, or click to select a file",
      invitation_sent: "Invitation sent",
      invitation_email: "Invite by email",
      board_owner: "Owner",
      no_column: "No column",
      unnasigned: "Unnasigned",
      no_estimate: "No estimate",
      no_description: "No description",
      show_history: "Show history",
      no_history: "No history",
      full_screen: "Full screen",
      exit_full_screen: "Exit full screen",
      newDocument: "New document",
    },
  },
);
