const { jangarooConfig } = require("@jangaroo/core");

module.exports = jangarooConfig({
  type: "code",
  sencha: {
    name: "com.coremedia.labs.publication.scheduled__scheduled-studio-client",
    namespace: "com.coremedia.labs.publication.scheduled",
  },
  autoLoad: [
    "./src/ScheduledPublicationWorkflowPlugin",
  ],
});
