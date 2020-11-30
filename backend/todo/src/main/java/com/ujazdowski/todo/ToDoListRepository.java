package com.ujazdowski.todo;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ToDoListRepository extends MongoRepository<ToDoList, String> {

    List<ToDoList> findAllByUsername(String username);

    List<ToDoList> findAllByUsernameAndNameLike(String username, String name);
}
