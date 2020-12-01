import './App.css';
import Weather from "./weather/Weather";
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {toast, ToastContainer} from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';
import {HashRouter, Link, Route, RouteComponentProps, Switch} from "react-router-dom";
import {Col, Container, Nav, Row} from "react-bootstrap";
import Home from "./home/Home";
import {KeycloakProvider} from "@react-keycloak/web";
import {initConfig, keycloak} from "./keycloak/keycloak";
import Profile from "./profile/Profile";
import Loader from "./Loader";
import KeycloakApi from "./keycloak/KeycloakApi";
import {User} from "./keycloak/UserInfo";
import ToDoListView from "./todo-list/ToDoListView";

export interface AppState {
    userInfo: User | null;
}

export default class App extends React.Component<{}, AppState> {

    constructor(props: {}) {
        super(props);
        this.state = {
            userInfo: null
        };

        // @ts-ignore
        this.handleOnEvent = this.handleOnEvent.bind(this);
    }

    private handleOnEvent(event: any, error: any) {
        if (event === 'onAuthSuccess') {
            if (keycloak.authenticated) {
                KeycloakApi.userInfo()
                    .then((user: User) => this.setState({userInfo: user}));
                toast.success("Zalogowano!")
            }
        }
    }


    render() {
        return (
            <div className="app">
                <KeycloakProvider
                    keycloak={keycloak}
                    initConfig={initConfig}
                    LoadingComponent={<Loader/>}
                    onEvent={(event: any, error: any) => this.handleOnEvent(event, error)}>
                    <HashRouter hashType="slash">
                        <Container fluid={true}>
                            <Row>
                                <Col sm={2}>
                                    <Nav defaultActiveKey="/home" className="flex-column">
                                        <Nav.Link>
                                            <Link to={"/"}>Strona startowa</Link>
                                        </Nav.Link>
                                        <Nav.Link>
                                            <Link to={"/weather"}>Pogoda</Link>
                                        </Nav.Link>
                                        <Nav.Link>
                                            <Link to={"/profile"}>Profil</Link>
                                        </Nav.Link>
                                        <Nav.Link>
                                            <Link to={"/todo-list"}>ToDo Lista</Link>
                                        </Nav.Link>
                                        <Nav.Link>
                                            <Link to={"/"} onClick={() => keycloak.logout()}>Wyloguj</Link>
                                        </Nav.Link>
                                    </Nav>
                                </Col>
                                <Col sm={8}>
                                    <main>
                                        <Switch>
                                            <Route exact path="/"
                                                   component={(props: RouteComponentProps) =>
                                                       <Home user={this.state.userInfo} {...props}/>}/>
                                            <Route exact path="/weather" component={Weather}/>
                                            <Route exact path="/profile"
                                                   component={(props: RouteComponentProps) =>
                                                       <Profile user={this.state.userInfo} {...props}/>}/>
                                            <Route exact path="/todo-list" component={ToDoListView}/>
                                        </Switch>
                                    </main>
                                </Col>
                            </Row>
                        </Container>
                    </HashRouter>
                </KeycloakProvider>
                <ToastContainer position="bottom-right"
                                autoClose={10000}
                                hideProgressBar={false}
                                newestOnTop={false}
                                closeOnClick={false}
                                rtl={false}
                                pauseOnFocusLoss={true}
                                draggable={true}
                                pauseOnHover={true}/>
            </div>
        );
    }
}