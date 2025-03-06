import { mergeTranslations } from "react-admin";
import { raSupabaseFrenchMessages } from "ra-supabase-language-french";
import raFrenchMessages from "ra-language-french";
import { raRealTimeLanguageFrench } from "@react-admin/ra-realtime";

export const frenchMessages = mergeTranslations(
  raFrenchMessages,
  raSupabaseFrenchMessages,
  raRealTimeLanguageFrench,
  {
    resources: {
      cards: {
        fields: {
          title: "Titre",
          estimate: "Estimation",
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
        "%{cards} / 1 carte |||| %{cards} / %{smart_count} cartes",
      pointCountWithLimit:
        "%{points} / 1 point |||| %{points} / %{smart_count} points",
      locked: "Verrouillé par %{name}",
      sendMessage: "Envoyer",
      editProfile: "Profil",
    },
  },
);
