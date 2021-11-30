import ResourceBundleUtil from "@jangaroo/runtime/l10n/ResourceBundleUtil";
import ThreeStepPublicationProcessDefinitions_properties from "./ThreeStepPublicationProcessDefinitions_properties";

ResourceBundleUtil.override(ThreeStepPublicationProcessDefinitions_properties, {
  StudioThreeStepPublication_displayName: "6-Augen Publikation",

  StudioThreeStepPublication_task_Compose_displayName: "Erstellen",
  StudioThreeStepPublication_task_Approve_displayName: "Freigeben",
  StudioThreeStepPublication_task_Publish_displayName: "Best\u00E4tigen",
  StudioThreeStepPublication_task_DoPublish_displayName: "Publizieren",

  StudioThreeStepPublication_state_Compose_displayName: "Erstellen",
  StudioThreeStepPublication_state_Approve_displayName: "Freigeben",
  StudioThreeStepPublication_state_Publish_displayName: "Best\u00E4tigen",
  StudioThreeStepPublication_state_DoPublish_displayName: "Publizieren",

  StudioThreeStepPublication_state_Compose_confirm: "Die Inhalte des Workflows sollen überarbeitet werden. Der Workflow wird automatisch allen berechtigten Personen angeboten.<br/><br/>Möchten Sie fortfahren?",
  StudioThreeStepPublication_state_Approve_confirm: "Die Inhalte des Workflows sollen überarbeitet werden. Der Workflow wird automatisch allen berechtigten Personen angeboten.<br/><br/>Möchten Sie fortfahren?",
  StudioThreeStepPublication_state_DoPublish_confirm: "Alle Inhalte im Workflow werden publiziert und sind dann auf der Live Seite sichtbar.<br/><br/>Möchten Sie fortfahren?",
});
