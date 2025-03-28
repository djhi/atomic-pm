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
    ra: {
      action: {
        more: "Liste des actions",
      },
      message: {
        delete_title: "Supprimer %{name} %{id}",
      },
    },
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
      card_attachments: {
        name: "Pièce jointe |||| Pièces jointes",
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
      document_drop_instructions:
        "Déposez un fichier ici, ou cliquez pour sélectionner un fichier",
      invitation_sent: "Invitation envoyée",
      invitation_email: "Inviter par email",
      board_owner: "Propriétaire",
      no_columns: "Aucune colonne",
      no_estimate: "Aucune estimation",
      unnasigned: "Non assigné",
      no_description: "Aucune description",
      show_history: "Afficher l'historique",
      no_history: "Aucun historique",
      full_screen: "Plein écran",
      exit_full_screen: "Quitter le plein écran",
      newDocument: "Nouveau document",
      no_tags: "Aucun tag",
      new_tag: "Nouveau tag",
    },
  },
);
