import { Calendar } from "@coremedia/studio-client.client-core";
import { PublicationWorkflowConstants } from "@coremedia/studio-client.workflow-models";
import {
  Binding,
  DateTimeField, PublicationWorkflowPlugin, RunningWorkflowFormExtension, StartWorkflowFormExtension,
  TextField, WorkflowIssuesLocalization, WorkflowLocalization,
  WorkflowState
} from "@coremedia/studio-client.workflow-plugin-models";
import { workflowLocalizationRegistry } from "@coremedia/studio-client.workflow-plugin-models";
import { workflowPlugins } from "@coremedia/studio-client.workflow-plugin-models";
import ScheduledPublicationProcessDefinitions_properties from "./ScheduledPublicationProcessDefinitions_properties";
import { getLocalizer, registerLocale } from "@coremedia/studio-client.i18n-models";
import { scheduledPublication} from "@coremedia/studio-client.common-icons";
import { dateToString, getCalendarOfTomorrow } from "./Utils";

// Register localization bundles
registerLocale(ScheduledPublicationProcessDefinitions_properties, "de", async () => {
  await import("./ScheduledPublicationProcessDefinitions_de_properties");
});

const WORKFLOW_NAME: string = "StudioScheduledPublication";
const SCHEDULE_TASK_NAME: string = "Schedule";


interface ScheduledPublicationViewModel {
  scheduledDateString?: string;
  scheduledDateTime?: Calendar;
  completionDateString?: string;
  processCompleted?: boolean;
  processRunning?: boolean;
}

const getWorkflowPlugin = async (): Promise<PublicationWorkflowPlugin> => {
  const localizer = await getLocalizer(ScheduledPublicationProcessDefinitions_properties);
  return {
    workflowName: WORKFLOW_NAME,

    transitions: [
      {
        task: SCHEDULE_TASK_NAME,
        defaultNextTask: PublicationWorkflowConstants.PUBLISH_TASK_NAME,
        nextSteps: [
          { name: PublicationWorkflowConstants.PUBLISH_TASK_NAME },
        ],
      },
    ],

    startWorkflowFormExtension: StartWorkflowFormExtension<ScheduledPublicationViewModel>({
      computeViewModel() {
        const defaultDueDate = getCalendarOfTomorrow();
        if (!defaultDueDate) {
          return undefined;
        }

        return { scheduledDateTime: defaultDueDate };
      },

      saveViewModel(viewModel: ScheduledPublicationViewModel): Record<string, any> {
        return { scheduledDate: viewModel.scheduledDateTime };
      },

      remotelyValidatedViewModelFields: ["scheduledDateTime"],

      fields: [
        DateTimeField({
          label: localizer("WorkflowForm_workflowDate_label"),
          value: Binding("scheduledDateTime"),
        }),
      ],
    }),

    runningWorkflowFormExtension: RunningWorkflowFormExtension<ScheduledPublicationViewModel>({

      computeViewModel(state: WorkflowState): ScheduledPublicationViewModel {
        return {
          scheduledDateString: dateToString(state.process.getProperties().get("scheduledDate")),
          completionDateString: dateToString(state.process.getCompletionDate()),
          processCompleted: state.process.isCompleted(),
          processRunning: !state.process.isCompleted(),
        };
      },

      saveViewModel() {
        return {};
      },

      fields: [
        TextField({
          label: localizer("WorkflowForm_workflowDate_label"),
          readonly: true,
          hidden: Binding("processCompleted"),
          value: Binding("scheduledDateString"),
        }),
        TextField({
          label: localizer("WorkflowForm_completionDate_label"),
          readonly: true,
          hidden: Binding("processRunning"),
          value: Binding("completionDateString"),
        }),
      ],
    }),
  };
};

getWorkflowPlugin().then((workflowPlugin) => {
  workflowPlugins._.addPublicationWorkflowPlugin(workflowPlugin);
});

const getWorkflowLocalization = async (): Promise<WorkflowLocalization> => {
  const localize = await getLocalizer(ScheduledPublicationProcessDefinitions_properties);
  return {
    displayName: localize("StudioScheduledPublication_displayName"),
    description: localize("StudioScheduledPublication_displayName"),
    svgIcon: scheduledPublication,
    states: {
      Schedule: localize("StudioScheduledPublication_state_Schedule_displayName"),
      Publish: localize("StudioScheduledPublication_state_Publish_displayName"),
      Wait: localize("StudioScheduledPublication_state_Wait_displayName"),
    },
    tasks: {
      Schedule: localize("StudioScheduledPublication_task_Schedule_displayName"),
      Publish: localize("StudioScheduledPublication_task_Publish_displayName"),
      Wait: localize("StudioScheduledPublication_task_Wait_displayName"),
    },
  };
};

getWorkflowLocalization().then((workflowLocalization) => {
  workflowLocalizationRegistry._.addLocalization(WORKFLOW_NAME, workflowLocalization);
});

const getWorkflowIssuesLocalization = async (): Promise<WorkflowIssuesLocalization> => {
  const localize = await getLocalizer(ScheduledPublicationProcessDefinitions_properties);
  return {
    dateLiesInPast_scheduledDate: localize("ErrorCode_dateLiesInPast_scheduledDate_text")
  };
}

getWorkflowIssuesLocalization().then((issuesLocalization) => {
  workflowLocalizationRegistry._.addIssuesLocalization(issuesLocalization);
});
