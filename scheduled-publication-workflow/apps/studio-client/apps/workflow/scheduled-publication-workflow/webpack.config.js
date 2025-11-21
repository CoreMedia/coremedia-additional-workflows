const { sharedModules } = require("@coremedia/studio-client.workflow.shared-modules");
const { getPluginWebpackConfig } = require("@coremedia/studio-client.build-config");

module.exports = getPluginWebpackConfig({
  name: "workflow_react_scheduledPublicationWorkflowPlugin",
  sharedModules: {
    "@coremedia/studio-client.workflow.shared-modules": sharedModules,
  },
});
