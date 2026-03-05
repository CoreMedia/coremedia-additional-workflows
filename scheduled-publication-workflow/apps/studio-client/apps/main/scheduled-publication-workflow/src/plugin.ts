export const initPlugin = async () => {
  const module = await import("@coremedia-labs/studio-client.shared.scheduled-publication-workflow");
  await module.addWorkflowPlugin();
};
