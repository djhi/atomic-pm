import { mergeTranslations } from "react-admin";
import { raSupabaseFrenchMessages } from "ra-supabase-language-french";
import raFrenchMessages from "ra-language-french";
import { raRealTimeLanguageFrench } from "@react-admin/ra-realtime";
import { raFormLayoutLanguageFrench } from "@react-admin/ra-form-layout";

export const frenchMessages = mergeTranslations(
  raFrenchMessages,
  raSupabaseFrenchMessages,
  raRealTimeLanguageFrench,
  raFormLayoutLanguageFrench,
  {
    resources: {
      cards: {
        fields: {
          title: "Titre",
          estimate: "Estimation",
          column_id: "Colonne",
          description: "Description",
          assigned_user_id: "Utilisateur assigné",
        },
      },
      columns: {
        fields: {
          name: "Nom",
          maxCards: "Maximum de cartes",
          maxEstimates: "Maximum de points d'estimations",
        },
      },
      boards: {
        name: "Tableau |||| Tableaux",
        fields: {
          name: "Nom",
        },
      },
    },
    pm: {
      documents: "Documents",
      members: "Membres",
      invitations: "Invitations",
      boards: "Tableaux",
      newColumn: "Nouvelle colonne",
      newCard: "Nouvelle carte",
      newBoard: "Nouveau tableau",
      cardCount: "1 carte |||| %{smart_count} cartes",
      pointCount: "1 point |||| %{smart_count} points",
      cardCountWithLimit:
        "%{value} / 1 carte |||| %{value} / %{smart_count} cartes",
      pointCountWithLimit:
        "%{value} / 1 point |||| %{value} / %{smart_count} points",
      locked: "Verrouillé par %{name}",
      sendMessage: "Envoyer",
      sendMessageInstructions: "CTRl+Enter pour envoyer",
      editProfile: "Profil",
      actionList: "Liste des actions",
    },
  },
);
