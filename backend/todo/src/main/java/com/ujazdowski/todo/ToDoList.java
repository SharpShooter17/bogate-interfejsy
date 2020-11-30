package com.ujazdowski.todo;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Collection;

@Document
public class ToDoList {
    @Id
    private String id;

    private String username;

    private String name;

    private String description;

    private Collection<ToDoItem> items;

    public ToDoList() {
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public Collection<ToDoItem> getItems() {
        return items;
    }

    public ToDoList setName(String name) {
        this.name = name;
        return this;
    }

    public ToDoList setItems(Collection<ToDoItem> items) {
        this.items = items;
        return this;
    }

    public String getDescription() {
        return description;
    }

    public ToDoList setDescription(String description) {
        this.description = description;
        return this;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
