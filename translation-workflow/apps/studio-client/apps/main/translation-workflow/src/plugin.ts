export const initPlugin = async () => {
  const module = await import("@coremedia-labs/studio-client.shared.extended-translation-workflow");
  await module.addWorkflowPlugin();
};
