package com.ujazdowski.todo;


import com.ujazdowski.auth.auth.AuthorizationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@RequestMapping("/api/todo/")
public class ToDoApi {

    private final ToDoListRepository repository;
    private final AuthorizationService authorizationService;

    @Autowired
    public ToDoApi(ToDoListRepository repository,
                   AuthorizationService authorizationService) {
        this.repository = repository;
        this.authorizationService = authorizationService;
    }

    @PostMapping
    public ToDoList save(@RequestBody ToDoList toDoList) {
        toDoList.setUsername(this.username());
        return repository.save(toDoList);
    }

    @GetMapping("{id}")
    public ToDoList get(@PathVariable String id) {
        ToDoList list = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Not found To-Do list with id: " + id));

        if (!list.getUsername().equals(username())) {
            throw new AccessDeniedException("Użytkownik nie jest właścicielem szukanej listy!");
        }

        return list;
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable String id) {
        repository.delete(get(id));
    }

    @GetMapping("/search/")
    public Collection<ToDoList> search(@RequestParam("name") String name) {
        return repository.findAllByUsernameAndNameLike(this.username(), name);
    }

    private String username() {
        return authorizationService.userInfo().getEmail();
    }

}
