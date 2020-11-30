import React from "react";
import {ToDoList} from "./ToDoList";
import ToDoListApi from "./ToDoListApi";
import {Card, CardColumns, ListGroup} from "react-bootstrap";
import {ToDoItem} from "./ToDoItem";

export interface ToDoListViewState {
    lists: ToDoList[];
}

export default class ToDoListView extends React.Component<{}, ToDoListViewState> {

    constructor(props: {}) {
        super(props);

        this.state = {
            lists: []
        };
    }

    componentDidMount(): void {
        ToDoListApi.list().then(list => this.setState({lists: list}));
    }

    render({lists} = this.state) {

        const cards = lists.map((list: ToDoList) => <Card>
            <Card.Body>
                <Card.Title>
                    {list.name}
                </Card.Title>
                <Card.Subtitle>
                    {list.description}
                </Card.Subtitle>
                <ListGroup>
                    {list.items.map((item: ToDoItem) =>
                        <ListGroup.Item>{item.title}</ListGroup.Item>
                    )}
                </ListGroup>
            </Card.Body>
        </Card>);

        return (
            <CardColumns>

            </CardColumns>
        )
    }

}