interface ThreeStepPublicationProcessDefinitions_properties {
  StudioThreeStepPublication_displayName: string;

  StudioThreeStepPublication_task_Compose_displayName: string;
  StudioThreeStepPublication_task_Approve_displayName: string;
  StudioThreeStepPublication_task_Publish_displayName: string;
  StudioThreeStepPublication_task_DoPublish_displayName: string;

  StudioThreeStepPublication_state_Compose_displayName: string;
  StudioThreeStepPublication_state_Approve_displayName: string;
  StudioThreeStepPublication_state_Publish_displayName: string;
  StudioThreeStepPublication_state_DoPublish_displayName: string;

  StudioThreeStepPublication_state_Compose_confirm: string;
  StudioThreeStepPublication_state_Approve_confirm: string;
  StudioThreeStepPublication_state_DoPublish_confirm: string;
}

const ThreeStepPublicationProcessDefinitions_properties: ThreeStepPublicationProcessDefinitions_properties = {
  StudioThreeStepPublication_displayName: "Reviewed and Confirmed Publication",

  StudioThreeStepPublication_task_Compose_displayName: "Compose",
  StudioThreeStepPublication_task_Approve_displayName: "Approve",
  StudioThreeStepPublication_task_Publish_displayName: "Confirm",
  StudioThreeStepPublication_task_DoPublish_displayName: "Publish",

  StudioThreeStepPublication_state_Compose_displayName: "Compose",
  StudioThreeStepPublication_state_Approve_displayName: "Approve",
  StudioThreeStepPublication_state_Publish_displayName: "Confirm",
  StudioThreeStepPublication_state_DoPublish_displayName: "Publish",

  StudioThreeStepPublication_state_Compose_confirm: "The content in this workflow needs revision. The workflow is automatically offered to all eligible people.<br><br>Do you wish to continue?",
  StudioThreeStepPublication_state_Approve_confirm: "The content in this workflow needs revision. The workflow is automatically offered to all eligible people.<br><br>Do you wish to continue?",
  StudioThreeStepPublication_state_DoPublish_confirm: "The content in this workflow will be published and will then be visible on the live site.<br><br>Do you wish to continue?",
};

export default ThreeStepPublicationProcessDefinitions_properties;
