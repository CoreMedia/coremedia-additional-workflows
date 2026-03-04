export const initPlugin = async () => {
  const module = await import("@coremedia-labs/studio-client.shared.scheduled-publication");
  await module.addWorkflowPlugin();
};
