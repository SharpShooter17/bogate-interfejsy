import {ToDoItemI} from "./ToDoItemI";

export interface ToDoListI {
    id: string | null;
    username: string | null;
    name: string;
    description: string;
    items: ToDoItemI[];
}

export class ToDoList implements ToDoListI {
    description: string;
    id: string | null;
    items: ToDoItemI[];
    name: string;
    username: string | null;

    constructor(name: string, description: string = '', id: string | null = null, items: ToDoItemI[] = [], username: string | null = null) {
        this.description = description;
        this.id = id;
        this.items = items;
        this.name = name;
        this.username = username;
    }
}