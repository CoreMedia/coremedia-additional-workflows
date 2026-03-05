export const initPlugin = async () => {
  const module = await import("@coremedia-labs/studio-client.shared.three-step-publication-workflow");
  await module.addWorkflowPlugin();
};
