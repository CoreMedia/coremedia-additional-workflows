const { jangarooConfig } = require("@jangaroo/core");

module.exports = jangarooConfig({
  type: "code",
  sencha: {
    name: "com.coremedia.labs.publication.threestep__threestep-studio-client",
    namespace: "com.coremedia.labs.publication.threestep",
  },
  autoLoad: [
    "./src/ThreeStepPublicationWorkflowPlugin",
  ],
});
