import ThreeStepPublicationProcessDefinitions_properties from "./ThreeStepPublicationProcessDefinitions_properties";
import { PublicationWorkflowConstants } from "@coremedia/studio-client.workflow-models";
import {
  PublicationWorkflowPlugin,
  WorkflowLocalizationConfig,
  workflowLocalizationRegistry,
  workflowPlugins
} from "@coremedia/studio-client.workflow-plugin-models";
import { getLocalizer, registerLocale } from "@coremedia/studio-client.i18n-models";
import { threeStepPublication} from "@coremedia/studio-client.common-icons";

// Register localization bundles
registerLocale(ThreeStepPublicationProcessDefinitions_properties, "de", async () => {
  await import("./ThreeStepPublicationProcessDefinitions_de_properties");
});

const WORKFLOW_NAME: string = "StudioThreeStepPublication";

const getWorkflowPlugin = async (): Promise<PublicationWorkflowPlugin> => {
  return {
    workflowName: WORKFLOW_NAME,

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
  };
};

getWorkflowPlugin().then((workflowPlugin) => {
  workflowPlugins._.addPublicationWorkflowPlugin(workflowPlugin);
});

const getWorkflowLocalization = async (): Promise<WorkflowLocalizationConfig> => {
  const localize = await getLocalizer(ThreeStepPublicationProcessDefinitions_properties);
  return {
    displayName: localize("StudioThreeStepPublication_displayName"),
    description: localize("StudioThreeStepPublication_displayName"),
    svgIcon: threeStepPublication,
    states: {
      Compose: {
        displayName: localize("StudioThreeStepPublication_state_Compose_displayName"),
        confirm: localize("StudioThreeStepPublication_state_Compose_confirm"),
      },
      Approve: {
        displayName: localize("StudioThreeStepPublication_state_Approve_displayName"),
        confirm: localize("StudioThreeStepPublication_state_Approve_confirm"),
      },
      Publish: {
        displayName: localize("StudioThreeStepPublication_state_Publish_displayName"),
        confirm: localize("StudioThreeStepPublication_state_DoPublish_confirm"),
      },
      DoPublish: {
        displayName: localize("StudioThreeStepPublication_state_DoPublish_displayName"),
        confirm: localize("StudioThreeStepPublication_state_DoPublish_confirm"),
      },
    },
    tasks: {
      Compose: localize("StudioThreeStepPublication_task_Compose_displayName"),
      Approve: localize("StudioThreeStepPublication_task_Approve_displayName"),
      Publish: localize("StudioThreeStepPublication_task_Publish_displayName"),
      DoPublish: localize("StudioThreeStepPublication_task_DoPublish_displayName"),
    }
  }
};

getWorkflowLocalization().then((workflowLocalization) => {
  workflowLocalizationRegistry._.addLocalization(WORKFLOW_NAME, workflowLocalization);
});
