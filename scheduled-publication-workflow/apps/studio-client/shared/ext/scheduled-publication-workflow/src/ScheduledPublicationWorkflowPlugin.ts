import { session } from "@coremedia/studio-client.cap-rest-client";
import { Calendar } from "@coremedia/studio-client.client-core";
import ContentRepositoryImpl from "@coremedia/studio-client.cap-rest-client-impl/content/impl/ContentRepositoryImpl";
import { getLocalizer } from "@coremedia/studio-client.i18n-models";
import { PublicationWorkflowConstants } from "@coremedia/studio-client.workflow-models";
import {
  Binding,
  DateTimeField,
  PublicationWorkflowPlugin,
  RunningWorkflowFormExtension,
  StartWorkflowFormExtension,
  TextField,
  WorkflowIssuesLocalization,
  WorkflowLocalization,
  workflowLocalizationRegistry,
  workflowPlugins,
  WorkflowState,
} from "@coremedia/studio-client.workflow-plugin-models";
import { is, joo } from "@jangaroo/runtime";
import ScheduledPublicationProcessDefinitions_properties from "./ScheduledPublicationProcessDefinitions_properties";

const SCHEDULE_TASK_NAME: string = "Schedule";

const dateTimeFormat: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "numeric",
  minute: "2-digit",
};

function getCalendarOfTomorrow(): Calendar {
  const dayDate: Date = new Date();
  const dayDateInMilliseconds = dayDate.getTime();
  const tomorrowInMillieSeconds = dayDateInMilliseconds + 86400000;
  const tomorrowDate: Date = new Date(tomorrowInMillieSeconds);
  return new Calendar({
    year: tomorrowDate.getFullYear(),
    month: tomorrowDate.getMonth(),
    day: tomorrowDate.getDate(),
    hour: tomorrowDate.getHours(),
    minute: tomorrowDate.getMinutes(),
    second: tomorrowDate.getSeconds(),
    offset: 0,
    timeZone: (session._.getConnection().getContentRepository() as ContentRepositoryImpl).getDefaultTimeZone(),
    normalized: true,
  });
}

function dateToString(value): string {
  let date: Date;
  if (is(value, Date)) {
    date = value;
  } else if (is(value, Calendar)) {
    date = value.getDate();
  } else {
    return null;
  }

  if (date) {
    const locale = joo.localeSupport.getLocale();
    return new Intl.DateTimeFormat(locale, dateTimeFormat).format(date);
  }
}

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
    workflowName: "StudioScheduledPublication",

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

const getScheduledPublicationProcessLocalization = async (): Promise<WorkflowLocalization> => {
  const localizer = await getLocalizer(ScheduledPublicationProcessDefinitions_properties);

  return {
    displayName: ScheduledPublicationProcessDefinitions_properties.StudioScheduledPublication_displayName,
    description: ScheduledPublicationProcessDefinitions_properties.StudioScheduledPublication_displayName,
    tasks: {
      Schedule: ScheduledPublicationProcessDefinitions_properties.StudioScheduledPublication_task_Schedule_displayName,
      Publish: ScheduledPublicationProcessDefinitions_properties.StudioScheduledPublication_task_Publish_displayName,
      Wait: ScheduledPublicationProcessDefinitions_properties.StudioScheduledPublication_task_Wait_displayName,
    },
    states: {
      Schedule: ScheduledPublicationProcessDefinitions_properties.StudioScheduledPublication_state_Schedule_displayName,
      Publish: ScheduledPublicationProcessDefinitions_properties.StudioScheduledPublication_state_Publish_displayName,
      Wait: ScheduledPublicationProcessDefinitions_properties.StudioScheduledPublication_state_Wait_displayName,
    },
  };
};

getScheduledPublicationProcessLocalization().then((scheduledPublicationProcessLocalization) => {
  workflowLocalizationRegistry._.addLocalization("StudioScheduledPublication", scheduledPublicationProcessLocalization);
});

const getScheduledPublicationIssuesLocalization = async (): Promise<WorkflowIssuesLocalization> => {
  const localizer = await getLocalizer(ScheduledPublicationProcessDefinitions_properties);

  return {
    dateLiesInPast_scheduledDate: ScheduledPublicationProcessDefinitions_properties.ErrorCode_dateLiesInPast_scheduledDate_text,
  };
};

getScheduledPublicationIssuesLocalization().then((scheduledPublicationIssuesLocalization) => {
  workflowLocalizationRegistry._.addIssuesLocalization(scheduledPublicationIssuesLocalization);
});
