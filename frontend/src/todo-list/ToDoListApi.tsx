import ErrorHandleApi from "../api/ErrorHandleApi";
import {backendUrl} from "../Config";
import {ToDoListI} from "./ToDoListI";

class ToDoListApi extends ErrorHandleApi {

    constructor() {
        super(backendUrl, '/api/todo/', true);
    }

    save(todoList: ToDoListI): Promise<ToDoListI> {
        return this.post<ToDoListI>('', todoList);
    }

    search(input: string): Promise<ToDoListI[]> {
        return this.get<ToDoListI[]>('search/?name=' + input);
    }

    list(): Promise<ToDoListI[]> {
        return this.get<ToDoListI[]>('');
    }

    delete(id: string): Promise<void> {
        return super.delete<void>(id);
    }

}

export default new ToDoListApi();