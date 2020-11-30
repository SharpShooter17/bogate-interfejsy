import './App.css';
import Weather from "./weather/Weather";
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {toast, ToastContainer} from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';
import {HashRouter, Link, Route, Switch} from "react-router-dom";
import {Col, Container, Nav, Row, Spinner} from "react-bootstrap";
import Home from "./home/Home";
import {KeycloakProvider} from "@react-keycloak/web";
import {initConfig, keycloak} from "./keycloak/keycloak";


export default class App extends React.Component<{}, {}> {

    private static handleOnEvent(event: any, error: any) {
        if (event === 'onAuthSuccess') {
            if (keycloak.authenticated) {
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
                    LoadingComponent={<Spinner animation="border"/>}
                    onEvent={(event: any, error: any) => App.handleOnEvent(event, error)}>
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
                                    <Link to={"/"} onClick={() => keycloak.logout()}>Wyloguj</Link>
                                </Nav.Link>
                            </Nav>
                        </Col>
                        <Col sm={8}>
                            <main>
                                <Switch>
                                    <Route exact path="/" component={Home}/>
                                    <Route exact path="/weather" component={Weather}/>
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