import { sharedModules } from "@coremedia/studio-client.workflow.shared-modules";
import { getPluginWebpackConfig } from "@coremedia/studio-client.build-config";

export default getPluginWebpackConfig({
  name: "workflow_extendedTranslationWorkflowPlugin",
  sharedModules: {
    "@coremedia/studio-client.workflow.shared-modules": sharedModules,
  },
});
