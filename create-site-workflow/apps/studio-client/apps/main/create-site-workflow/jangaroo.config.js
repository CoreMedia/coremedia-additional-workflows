const { jangarooConfig } = require("@jangaroo/core");

module.exports = jangarooConfig({
  type: "code",
  sencha: {
    name: "com.coremedia.blueprint__create-site-workflow-plugin",
    namespace: "com.coremedia.blueprint.workflow.createsite",
    studioPlugins: [
      {
        mainClass: "com.coremedia.blueprint.workflow.createsite.CreateSiteWorkflowStudioPlugin",
        name: "Create Site Workflow Plugin",
      },
    ],
  },
});
