# Create Project Workflow Action

Use this action to create a project containing all workflow content after your workflow is finished.

> Note that this action is currently designed to be used with localization workflows.

## How to use

1. Enable the extension.
```shell
mvn extensions:sync -Denable=custom-workflow-actions
````

2. Add the `create-project-workflow-action` dependency to your workflow module.

```xml
<dependency>
    <groupId>com.coremedia.blueprint</groupId>
    <artifactId>create-project-workflow-action</artifactId>
    <version>${project.version}</version>
</dependency>
```

3. Import the Spring configuration in your workflow configuration class.

```java
@Configuration
@Import({CreateProjectActionConfiguration.class})
public class MyWorkflowConfiguration {
  ...
}
```

4. Adapt your workflow definition by adding the action before the final step.

```xml
...

<Variable name="createProject" type="Boolean">
  <!-- default value for project creation -->
  <Boolean value="true"/>
</Variable>

...

<AutomatedTask name="CreateProject" successor="Finish">
    <Action class="com.coremedia.blueprint.workflow.actions.CreateProjectAction" 
            derivedContentsVariable="derivedContents" 
            masterContentObjectsVariable="masterContentObjects" 
            subjectVariable="subject" 
            commentVariable="comment" 
            performerVariable="performer"/>
</AutomatedTask>
...
```

5. (Optional) If you want the users to control wether ot not the project will be created when tey start the workflow, you can add a checkbox in the Start workflow dialog.

```ts
interface MyWorkflowViewModel {
  createProject?: boolean;
}

workflowPlugins._.addTranslationWorkflowPlugin<MyWorkflowViewModel>({
  startWorkflowFormExtension: {

    computeViewModel(): MyWorkflowViewModel {
      return {createProject: false}; // Default for the checkbox
    },

    saveViewModel(viewModel: MyWorkflowViewModel): Record<string, any> {
      return {createProject: viewModel.createProject};
    },

    fields: [
      CheckField({
        label: "Create project",
        tooltip: "Create project when workflow is finished.",
        value: Binding("createProject")
      })
    ]

  }
});
```
