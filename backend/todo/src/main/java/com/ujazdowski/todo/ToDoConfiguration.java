package com.ujazdowski.todo;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@Configuration
@EnableMongoRepositories(basePackages = "com.ujazdowski.todo")
public class ToDoConfiguration {
}
