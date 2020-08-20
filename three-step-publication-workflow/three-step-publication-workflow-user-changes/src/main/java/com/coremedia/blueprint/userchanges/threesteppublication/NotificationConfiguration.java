package com.coremedia.blueprint.userchanges.threesteppublication;

import com.coremedia.springframework.customizer.Customize;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class NotificationConfiguration {

  private static final String THREE_STEP_PUBLICATION_WORKFLOW_NAME = "StudioThreeStepPublication";

  @Bean
  @Customize("notificationsForPublicationWorkflowList")
  List<String> addThreeStepPublicationWorkflowNotifications() {
    return List.of(THREE_STEP_PUBLICATION_WORKFLOW_NAME);
  }

}
