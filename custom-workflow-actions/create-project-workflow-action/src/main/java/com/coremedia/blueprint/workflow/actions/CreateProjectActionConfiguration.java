package com.coremedia.blueprint.workflow.actions;

import com.coremedia.collaboration.project.elastic.ProjectConfiguration;
import com.coremedia.collaboration.todo.elastic.TodoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

@Configuration
@ComponentScan(basePackages = {"com.coremedia.collaboration.project"})
@Import({
        ProjectConfiguration.class,
        TodoConfiguration.class})
public class CreateProjectActionConfiguration {

}
