export const initPlugin = async () => {
  const module = await import("@coremedia-labs/studio-client.ext.scheduled-publication-workflow-studio-client");
  await module.addScheduledPublicationWorkflowPlugin();
};
