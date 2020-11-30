import {ToDoItem} from "./ToDoItem";

export interface ToDoList {
    id: string;
    username: string;
    name: string;
    description: string;
    items: ToDoItem[];
}