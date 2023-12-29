import PublicationWorkflowConstants from "@coremedia/studio-client.workflow-models/PublicationWorkflowConstants";
import { workflowLocalizationRegistry } from "@coremedia/studio-client.workflow-plugin-models/WorkflowLocalizationRegistry";
import { workflowPlugins } from "@coremedia/studio-client.workflow-plugin-models/WorkflowPluginRegistry";
import ThreeStepPublicationProcessDefinitions_properties from "./ThreeStepPublicationProcessDefinitions_properties";

workflowPlugins._.addPublicationWorkflowPlugin<any>({
  workflowName: "StudioThreeStepPublication",

  nextStepVariable: PublicationWorkflowConstants.NEXT_SELECTED_TASK_PROCESS_VARIABLE_NAME,

  transitions: [
    {
      task: PublicationWorkflowConstants.COMPOSE_TASK_NAME,
      defaultNextTask: PublicationWorkflowConstants.APPROVE_TASK_NAME,
      nextSteps: [
        {
          name: PublicationWorkflowConstants.APPROVE_TASK_NAME,
          isAssignmentTask: true,
        },
      ],
    },
    {
      task: PublicationWorkflowConstants.APPROVE_TASK_NAME,
      defaultNextTask: PublicationWorkflowConstants.PUBLISH_TASK_NAME,
      nextSteps: [
        {
          name: PublicationWorkflowConstants.COMPOSE_TASK_NAME,
          allowAlways: true,
        },
        {
          name: PublicationWorkflowConstants.PUBLISH_TASK_NAME,
          isAssignmentTask: true,
        },
      ],
    },
    {
      task: PublicationWorkflowConstants.PUBLISH_TASK_NAME,
      defaultNextTask: "DoPublish",
      nextSteps: [
        {
          name: PublicationWorkflowConstants.APPROVE_TASK_NAME,
          allowAlways: true,
        },
        {
          name: "DoPublish",
          forceCurrentPerformer: true,
        },
      ],
    },
  ],
});

workflowLocalizationRegistry._.addLocalization("StudioThreeStepPublication", {
  displayName: ThreeStepPublicationProcessDefinitions_properties.StudioThreeStepPublication_displayName,
  description: ThreeStepPublicationProcessDefinitions_properties.StudioThreeStepPublication_displayName,
  tasks: {
    Compose: ThreeStepPublicationProcessDefinitions_properties.StudioThreeStepPublication_task_Compose_displayName,
    Approve: ThreeStepPublicationProcessDefinitions_properties.StudioThreeStepPublication_task_Approve_displayName,
    Publish: ThreeStepPublicationProcessDefinitions_properties.StudioThreeStepPublication_task_Publish_displayName,
    DoPublish: ThreeStepPublicationProcessDefinitions_properties.StudioThreeStepPublication_task_DoPublish_displayName,
  },
  states: {
    Compose: {
      displayName: ThreeStepPublicationProcessDefinitions_properties.StudioThreeStepPublication_state_Compose_displayName,
      confirm: ThreeStepPublicationProcessDefinitions_properties.StudioThreeStepPublication_state_Compose_confirm,
    },
    Approve: {
      displayName: ThreeStepPublicationProcessDefinitions_properties.StudioThreeStepPublication_state_Approve_displayName,
      confirm: ThreeStepPublicationProcessDefinitions_properties.StudioThreeStepPublication_state_Approve_confirm,
    },
    Publish: {
      displayName: ThreeStepPublicationProcessDefinitions_properties.StudioThreeStepPublication_state_Publish_displayName,
      confirm: ThreeStepPublicationProcessDefinitions_properties.StudioThreeStepPublication_state_DoPublish_confirm,
    },
    DoPublish: {
      displayName: ThreeStepPublicationProcessDefinitions_properties.StudioThreeStepPublication_state_DoPublish_displayName,
      confirm: ThreeStepPublicationProcessDefinitions_properties.StudioThreeStepPublication_state_DoPublish_confirm,
    },
  },
});
