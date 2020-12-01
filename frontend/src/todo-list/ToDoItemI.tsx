export interface ToDoItemI {
    title: string;
    description: string;
    completed: boolean;
}

export class ToDoItem implements ToDoItemI {
    completed: boolean;
    description: string;
    title: string;

    constructor() {
        this.completed = false;
        this.description = "";
        this.title = "";
    }

}