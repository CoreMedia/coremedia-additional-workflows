package com.coremedia.blueprint.scheduledpublication;

import com.coremedia.rest.cap.workflow.validation.configuration.PublicationWorkflowValidationConfiguration;
import com.coremedia.rest.cap.workflow.validation.impl.translation.DateLiesInFutureValidator;
import com.coremedia.rest.cap.workflow.validation.model.WorkflowStartValidators;
import com.coremedia.rest.cap.workflow.validation.model.WorkflowValidatorsModel;
import com.coremedia.rest.cap.workflow.validation.preparation.WorkflowValidationPreparation;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.AutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;

import static com.coremedia.rest.cap.workflow.validation.configuration.PublicationWorkflowValidationConfiguration.PUBLICATION_VALIDATION_PREPARATION;
import static java.util.Arrays.asList;

@AutoConfiguration
@Import(PublicationWorkflowValidationConfiguration.class)
public class ScheduledPublicationWorkflowConfiguration {

  private static final String SCHEDULED_PUBLICATION_WORKFLOW_NAME = "StudioScheduledPublication";
  private static final String SCHEDULED_DATE_PROPERTY_NAME = "scheduledDate";

  @Bean
  WorkflowValidatorsModel scheduledPublicationWorkflowValidators(
          @Qualifier(PUBLICATION_VALIDATION_PREPARATION) WorkflowValidationPreparation publicationValidationPreparation) {
    DateLiesInFutureValidator scheduledDateValidator = new DateLiesInFutureValidator(SCHEDULED_DATE_PROPERTY_NAME);

    return new WorkflowValidatorsModel(SCHEDULED_PUBLICATION_WORKFLOW_NAME, null,
            new WorkflowStartValidators(publicationValidationPreparation, asList(scheduledDateValidator)));
  }
}
