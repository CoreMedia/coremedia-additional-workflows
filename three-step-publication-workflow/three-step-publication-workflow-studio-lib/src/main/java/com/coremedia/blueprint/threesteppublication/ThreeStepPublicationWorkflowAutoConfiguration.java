package com.coremedia.blueprint.threesteppublication;

import com.coremedia.cap.content.ContentRepository;
import com.coremedia.cap.content.authorization.Rights;
import com.coremedia.cap.workflow.TaskState;
import com.coremedia.rest.cap.config.StudioConfigurationProperties;
import com.coremedia.rest.cap.workflow.validation.WorkflowValidator;
import com.coremedia.rest.cap.workflow.validation.impl.publication.PublicationContentRightsWorkflowValidator;
import com.coremedia.rest.cap.workflow.validation.model.ValidationTask;
import com.coremedia.rest.cap.workflow.validation.model.WorkflowStartValidators;
import com.coremedia.rest.cap.workflow.validation.model.WorkflowTaskValidators;
import com.coremedia.rest.cap.workflow.validation.model.WorkflowValidatorsModel;
import com.coremedia.rest.cap.workflow.validation.preparation.WorkflowValidationPreparation;
import com.coremedia.springframework.customizer.Customize;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.AutoConfiguration;
import org.springframework.context.annotation.Bean;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.coremedia.rest.cap.workflow.validation.configuration.PublicationWorkflowValidationConfiguration.APPROVE_TASK_NAME;
import static com.coremedia.rest.cap.workflow.validation.configuration.PublicationWorkflowValidationConfiguration.COMPOSE_TASK_NAME;
import static com.coremedia.rest.cap.workflow.validation.configuration.PublicationWorkflowValidationConfiguration.PUBLICATION_VALIDATION_PREPARATION;
import static com.coremedia.rest.cap.workflow.validation.configuration.PublicationWorkflowValidationConfiguration.PUBLISH_TASK_NAME;

@AutoConfiguration
public class ThreeStepPublicationWorkflowAutoConfiguration {

  private static final String THREE_STEP_PUBLICATION_WORKFLOW_NAME = "StudioThreeStepPublication";
  private static final String THREE_STEP_PUBLICATION_WORKFLOW_VALIDATORS = "StudioThreeStepPublication";

  @Bean
  @Customize("publicationProcessNames")
  List<String> addThreeStepPublicationWorkflowName() {
    return List.of(THREE_STEP_PUBLICATION_WORKFLOW_NAME);
  }

  @Bean
  WorkflowValidatorsModel threeStepPublicationWorkflowValidator(@Qualifier(PUBLICATION_VALIDATION_PREPARATION) WorkflowValidationPreparation publicationValidationPreparation,
                                                                @Qualifier(THREE_STEP_PUBLICATION_WORKFLOW_VALIDATORS) List<WorkflowValidator> threeStepWorkflowValidators) {
    ValidationTask composeRunningTask = new ValidationTask(COMPOSE_TASK_NAME, TaskState.RUNNING);
    ValidationTask approveRunningTask = new ValidationTask(APPROVE_TASK_NAME, TaskState.RUNNING);
    ValidationTask publishRunningTask = new ValidationTask(PUBLISH_TASK_NAME, TaskState.RUNNING);

    WorkflowTaskValidators taskValidators = new WorkflowTaskValidators(publicationValidationPreparation, Map.of(composeRunningTask, threeStepWorkflowValidators, approveRunningTask, threeStepWorkflowValidators, publishRunningTask, threeStepWorkflowValidators));

    return new WorkflowValidatorsModel(THREE_STEP_PUBLICATION_WORKFLOW_NAME, taskValidators, new WorkflowStartValidators(publicationValidationPreparation, threeStepWorkflowValidators));
  }

  @Bean(value = THREE_STEP_PUBLICATION_WORKFLOW_VALIDATORS)
  List<WorkflowValidator> threeStepDefaultPublicationWorkflowValidator(ContentRepository contentRepository,
                                                                       StudioConfigurationProperties studioConfigurationProperties) {
    Map<String, Rights> requiredContentRightsForTasks = new HashMap<>();
    requiredContentRightsForTasks.put("Approve", Rights.valueOf("RA"));
    requiredContentRightsForTasks.put("Publish", Rights.valueOf("RAP"));

    PublicationContentRightsWorkflowValidator defaultPublicationWorkflowValidator = new PublicationContentRightsWorkflowValidator(contentRepository, requiredContentRightsForTasks, Map.of(PUBLISH_TASK_NAME, List.of("DoPublish")));
    //defaultPublicationWorkflowValidator.setMaxIterationsToCompleteChangeSet(studioConfigurationProperties.getRest().getMax().getIterations().getComplete().getChangeset());

    return Collections.singletonList(defaultPublicationWorkflowValidator);
  }
}
