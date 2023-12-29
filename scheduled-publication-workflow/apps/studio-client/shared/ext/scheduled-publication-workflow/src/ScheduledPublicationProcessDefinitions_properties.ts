interface ScheduledPublicationProcessDefinitions_properties {
  StudioScheduledPublication_displayName: string;
  WorkflowForm_workflowDate_label: string;
  WorkflowForm_completionDate_label: string;
  StudioScheduledPublication_task_Schedule_displayName: string;
  StudioScheduledPublication_state_Schedule_displayName: string;
  StudioScheduledPublication_task_Publish_displayName: string;
  StudioScheduledPublication_state_Publish_displayName: string;
  StudioScheduledPublication_task_Wait_displayName: string;
  StudioScheduledPublication_state_Wait_displayName: string;
  ErrorCode_dateLiesInPast_scheduledDate_text: string;
}

const ScheduledPublicationProcessDefinitions_properties: ScheduledPublicationProcessDefinitions_properties = {
  StudioScheduledPublication_displayName: "Scheduled Publication",
  WorkflowForm_workflowDate_label: "Scheduled Date",
  WorkflowForm_completionDate_label: "Completion Date",
  StudioScheduledPublication_task_Schedule_displayName: "Schedule Publication",
  StudioScheduledPublication_state_Schedule_displayName: "Starting Scheduled Workflow (current step)",
  StudioScheduledPublication_task_Publish_displayName: "Publish",
  StudioScheduledPublication_state_Publish_displayName: "Content Published at Scheduled Time",
  StudioScheduledPublication_task_Wait_displayName: "Waiting for Scheduled Publication",
  StudioScheduledPublication_state_Wait_displayName: "Waiting for Scheduled Publication",
  ErrorCode_dateLiesInPast_scheduledDate_text: "The scheduled date must not be in the past.",
};

export default ScheduledPublicationProcessDefinitions_properties;
