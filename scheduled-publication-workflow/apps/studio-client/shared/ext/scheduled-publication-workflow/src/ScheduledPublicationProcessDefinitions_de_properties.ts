import ResourceBundleUtil from "@jangaroo/runtime/l10n/ResourceBundleUtil";
import ScheduledPublicationProcessDefinitions_properties from "./ScheduledPublicationProcessDefinitions_properties";

ResourceBundleUtil.override(ScheduledPublicationProcessDefinitions_properties, {
  StudioScheduledPublication_displayName: "Zeitbasierte Publikation",
  WorkflowForm_workflowDate_label: "Geplante Publikation",
  WorkflowForm_completionDate_label: "Fertig gestellt",
  StudioScheduledPublication_task_Schedule_displayName: "Erstellen",
  StudioScheduledPublication_state_Schedule_displayName: "Zeitbasierte Publikation starten (aktueller Schritt)",
  StudioScheduledPublication_task_Publish_displayName: "Publizieren",
  StudioScheduledPublication_state_Publish_displayName: "Inhalte publiziert zum geplanten Zeitpunkt",
  StudioScheduledPublication_task_Wait_displayName: "Warten auf geplante Publikation",
  ErrorCode_dateLiesInPast_scheduledDate_text: "Das geplante Publikations-Datum darf nicht in der Vergangenheit liegen.",
});
