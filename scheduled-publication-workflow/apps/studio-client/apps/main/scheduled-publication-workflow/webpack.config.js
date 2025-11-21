const { sharedModules } = require("@coremedia/studio-client.main.shared-modules");
const { getPluginWebpackConfig } = require("@coremedia/studio-client.build-config");

module.exports = getPluginWebpackConfig({
  name: "main_scheduledPublicationWorkflowPlugin",
  sharedModules: {
    "@coremedia/studio-client.main.shared-modules": sharedModules,
  },
});
