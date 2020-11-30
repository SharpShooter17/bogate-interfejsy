import ErrorHandleApi from "../api/ErrorHandleApi";
import {backendUrl} from "../Config";
import {ToDoList} from "./ToDoList";

class ToDoListApi extends ErrorHandleApi {

    constructor() {
        super(backendUrl, '/api/todo/', true);
    }

    save(todoList: ToDoList): Promise<ToDoList> {
        return this.post<ToDoList>('', todoList);
    }

    search(input: string): Promise<ToDoList[]> {
        return this.get<ToDoList[]>('search/?name=' + input);
    }

    list(): Promise<ToDoList[]> {
        return this.get<ToDoList[]>('');
    }

    delete(id: string): Promise<void> {
        return super.delete<void>(id);
    }

}

export default new ToDoListApi();