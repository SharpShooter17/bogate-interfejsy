import React from "react";
import {ToDoList, ToDoListI} from "./ToDoListI";
import ToDoListApi from "./ToDoListApi";
import {Button, Card, CardColumns, Col, Form, Row} from "react-bootstrap";
import {ToDoItem, ToDoItemI} from "./ToDoItemI";
import {toast} from "react-toastify";
// @ts-ignore
import EditableLabel from "react-inline-edition";
import {FaPlusCircle, FaTrash} from "react-icons/all";

export interface ToDoListViewState {
    lists: ToDoListI[];
    newListName: string;
}

export default class ToDoListView extends React.Component<{}, ToDoListViewState> {

    constructor(props: {}) {
        super(props);

        this.state = {
            lists: [],
            newListName: ''
        };

        // @ts-ignore
        this.saveList = this.saveList.bind(this);
    }

    componentDidMount(): void {
        ToDoListApi.list().then(list => this.setState({lists: list}));
    }

    saveList(list: ToDoListI): Promise<ToDoListI> {
        return ToDoListApi.save(list).then((savedList: ToDoListI) => {
            const lists = this.state.lists.filter(l => l.id !== savedList.id);
            lists.push(savedList);
            this.setState({lists: lists});
            return savedList;
        });
    }

    render({lists, newListName} = this.state) {

        // @ts-ignore
        const cards = lists.sort((l1: ToDoListI, l2: ToDoListI) => l1.id?.localeCompare(l2.id))
            .map((list: ToDoListI) =>
                <Card>
                    <Card.Body>
                        <Card.Title>
                            <EditableLabel text={list.name}
                                           labelPlaceHolder="Brak tytułu"
                                           onFocusOut={(name: string) => {
                                               list.name = name;
                                               this.saveList(list);
                                           }}/>
                            <Button variant="outline-primary"
                                    className="float-right"
                                    onClick={() => {
                                        list.items.push(new ToDoItem());
                                        this.saveList(list);
                                    }}>
                                <FaPlusCircle/>
                            </Button>
                        </Card.Title>
                        <Card.Subtitle>
                            <EditableLabel text={list.description}
                                           className={"text-muted"}
                                           labelPlaceHolder="Brak opisu"
                                           onFocusOut={(description: string) => {
                                               list.description = description;
                                               this.saveList(list);
                                           }}/>
                        </Card.Subtitle>
                        {list.items.map((item: ToDoItemI) =>
                            <Row className="mt-3">
                                <Col>
                                    <Row>
                                        <Col sm={1}>
                                            <Form.Check aria-label="Zakończono"
                                                        checked={item.completed}
                                                        onChange={(e: any) => {
                                                            item.completed = e.target.checked;
                                                            this.saveList(list);
                                                        }}/>
                                        </Col>
                                        <Col sm={11}>
                                            <EditableLabel text={item.title}
                                                           labelPlaceHolder="Brak tytułu"
                                                           onFocusOut={(title: string) => {
                                                               item.title = title;
                                                               this.saveList(list);
                                                           }}/>
                                            <Button variant={"outline-danger"}
                                                    className="float-right"
                                                    onClick={() => {
                                                        // @ts-ignore
                                                        list.items = list.items.filter(i => i !== item);
                                                        this.saveList(list);
                                                    }}>
                                                <FaTrash/>
                                            </Button>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm={12}>
                                            <EditableLabel text={item.description}
                                                           className={"text-muted"}
                                                           labelPlaceHolder="Brak opisu"
                                                           onFocusOut={(description: string) => {
                                                               item.description = description;
                                                               this.saveList(list);
                                                           }}/>
                                        </Col>
                                    </Row>
                                    <hr/>
                                </Col>
                            </Row>
                        )}
                    </Card.Body>
                </Card>);

        return (
            <div>
                <Form className="mt-4" onSubmit={e => {
                    e.preventDefault();
                    const list = new ToDoList(newListName);
                    this.saveList(list).then(l => {
                        toast.success("Dodano listę");
                        this.setState({newListName: ''});
                    });
                }}>
                    <Form.Group as={Row}>
                        <Form.Label sm={1} className="h5">Nazwa listy</Form.Label>
                        <Col sm={9}>
                            <Form.Control type="text"
                                          name="title"
                                          id="title"
                                          placeholder="Nazwa listy"
                                          value={newListName ?? ""}
                                          onChange={e => {
                                              newListName = e.target.value;
                                              this.setState({newListName: newListName});
                                          }}/>
                        </Col>
                        <Col sm={2}>
                            <Button type="submit" color="primary">Dodaj nową listę</Button>
                        </Col>
                    </Form.Group>
                </Form>
                <hr/>
                <CardColumns>
                    {cards}
                </CardColumns>
            </div>
        )
    }

}