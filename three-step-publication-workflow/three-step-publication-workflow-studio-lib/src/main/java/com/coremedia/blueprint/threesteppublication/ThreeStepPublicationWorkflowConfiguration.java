package com.coremedia.blueprint.threesteppublication;

import com.coremedia.cap.content.authorization.Rights;
import com.coremedia.cap.workflow.TaskState;
import com.coremedia.rest.cap.config.StudioConfigurationProperties;
import com.coremedia.rest.cap.workflow.validation.WorkflowValidator;
import com.coremedia.rest.cap.workflow.validation.impl.publication.DefaultPublicationWorkflowValidator;
import com.coremedia.rest.cap.workflow.validation.model.ValidationTask;
import com.coremedia.rest.cap.workflow.validation.model.WorkflowValidatorsModel;
import com.coremedia.springframework.customizer.Customize;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Configuration
public class ThreeStepPublicationWorkflowConfiguration {

  private static final String THREE_STEP_PUBLICATION_WORKFLOW_NAME = "StudioThreeStepPublication";

  @Bean
  @Customize("publicationProcessNames")
  List<String> addThreeStepPublicationWorkflowName() {
    return List.of(THREE_STEP_PUBLICATION_WORKFLOW_NAME);
  }

  @Bean
  WorkflowValidatorsModel threeStepPublicationWorkflowValidator(DefaultPublicationWorkflowValidator threeStepDefaultPublicationWorkflowValidator) {
    ValidationTask composeRunningTask = new ValidationTask("Compose", TaskState.RUNNING);
    ValidationTask approveRunningTask = new ValidationTask("Approve", TaskState.RUNNING);
    ValidationTask publishRunningTask = new ValidationTask("Publish", TaskState.RUNNING);

    List<WorkflowValidator> threeStepWorkflowValidators = List.of(threeStepDefaultPublicationWorkflowValidator);
    Map<ValidationTask, List<WorkflowValidator>> taskValidators = Map.of(composeRunningTask, threeStepWorkflowValidators, approveRunningTask, threeStepWorkflowValidators, publishRunningTask, threeStepWorkflowValidators);

    return new WorkflowValidatorsModel(THREE_STEP_PUBLICATION_WORKFLOW_NAME, taskValidators, threeStepWorkflowValidators);
  }

  @Bean
  DefaultPublicationWorkflowValidator threeStepDefaultPublicationWorkflowValidator(StudioConfigurationProperties studioConfigurationProperties) {
    Map<String, Rights> requiredContentRightsForTasks = new HashMap<>();
    requiredContentRightsForTasks.put("Approve", Rights.valueOf("RA"));
    requiredContentRightsForTasks.put("Publish", Rights.valueOf("RAP"));

    DefaultPublicationWorkflowValidator defaultPublicationWorkflowValidator = new DefaultPublicationWorkflowValidator();
    defaultPublicationWorkflowValidator.setSuccessorTasksToCheckForAcceptance(Map.of("Publish", List.of("DoPublish")));
    defaultPublicationWorkflowValidator.setRequiredContentRightsForTasks(requiredContentRightsForTasks);
    defaultPublicationWorkflowValidator.setMaxIterationsToCompleteChangeSet(studioConfigurationProperties.getRest().getMax().getIterations().getComplete().getChangeset());

    return defaultPublicationWorkflowValidator;
  }
}
