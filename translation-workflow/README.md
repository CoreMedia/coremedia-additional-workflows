# Translation Workflow

> **Note:** This is a customized copy of the default `translation` workflow with additional grants that allows to define individual rights on the workflow.

## How to use
If you want to use this workflow, make sure to replace the standard import in `global/management-tools/management-tools-image/src/main/image/coremedia/import-default-workflows`.

```shell
# before
DEFAULT_WORKFLOWS="Translation:/coremedia/tools/properties/corem/workflows/translation.xml ..."

# after
DEFAULT_WORKFLOWS="Translation:/com/coremedia/blueprint/workflow/extended-translation.xml ...
```
