const { jangarooConfig } = require("@jangaroo/core");

module.exports = jangarooConfig({
  type: "code",
  sencha: {
    name: "com.coremedia.labs.workflow.translation__translation-studio-client",
    namespace: "com.coremedia.labs.workflow.translation",
  },
  autoLoad: [
    "./src/ExtendedTranslationWorkflowPlugin",
  ],
});
