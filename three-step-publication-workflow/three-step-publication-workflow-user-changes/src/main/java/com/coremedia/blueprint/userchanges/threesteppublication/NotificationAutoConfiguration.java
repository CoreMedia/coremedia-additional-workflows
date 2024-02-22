package com.coremedia.blueprint.userchanges.threesteppublication;

import com.coremedia.springframework.customizer.Customize;
import org.springframework.boot.autoconfigure.AutoConfiguration;
import org.springframework.context.annotation.Bean;

import java.util.List;

@AutoConfiguration
public class NotificationAutoConfiguration {

  private static final String THREE_STEP_PUBLICATION_WORKFLOW_NAME = "StudioThreeStepPublication";

  @Bean
  @Customize("notificationsForPublicationWorkflowList")
  List<String> addThreeStepPublicationWorkflowNotifications() {
    return List.of(THREE_STEP_PUBLICATION_WORKFLOW_NAME);
  }

}
