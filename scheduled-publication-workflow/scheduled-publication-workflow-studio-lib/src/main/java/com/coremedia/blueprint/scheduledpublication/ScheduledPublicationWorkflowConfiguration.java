package com.coremedia.blueprint.scheduledpublication;

import com.coremedia.rest.cap.workflow.validation.WorkflowValidationConfiguration;
import com.coremedia.rest.cap.workflow.validation.impl.publication.DefaultPublicationWorkflowValidator;
import com.coremedia.rest.cap.workflow.validation.impl.translation.DateLiesInFutureValidator;
import com.coremedia.rest.cap.workflow.validation.model.WorkflowValidatorsModel;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

import java.util.Collections;
import java.util.List;

@Configuration
@Import(WorkflowValidationConfiguration.class)
public class ScheduledPublicationWorkflowConfiguration {

  private static final String SCHEDULED_PUBLICATION_WORKFLOW_NAME = "StudioScheduledPublication";
  private static final String SCHEDULED_DATE_PROPERTY_NAME = "scheduledDate";

  @Bean
  WorkflowValidatorsModel scheduledPublicationWorkflowValidators(DefaultPublicationWorkflowValidator defaultPublicationWorkflowValidator) {
    DateLiesInFutureValidator scheduledDateValidator = new DateLiesInFutureValidator(SCHEDULED_DATE_PROPERTY_NAME);
    return new WorkflowValidatorsModel(SCHEDULED_PUBLICATION_WORKFLOW_NAME, Collections.emptyMap(),
            List.of(defaultPublicationWorkflowValidator, scheduledDateValidator));
  }
}
