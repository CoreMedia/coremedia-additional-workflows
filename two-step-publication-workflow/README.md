# Two-Step Publication Workflow

> **Note:** This is a customized copy of the default `studio-two-step-publication` workflow with additional grants that allows to define individual rights on the workflow.

## How to use
If you want to use this workflow, make sure to replace the standard import in `global/management-tools/management-tools-image/src/main/image/coremedia/import-default-workflows`.

```shell
# before
DEFAULT_WORKFLOWS="StudioTwoStepPublication:studio-two-step-publication.xml ..."

# after
DEFAULT_WORKFLOWS="StudioTwoStepPublication:/com/coremedia/blueprint/workflow/extended-studio-two-step-publication.xml ...
```
