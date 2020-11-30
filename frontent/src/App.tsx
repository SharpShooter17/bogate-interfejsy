import './App.css';
import Weather from "./weather/Weather";
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {ToastContainer} from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';
import {HashRouter, Link, Route, Switch} from "react-router-dom";
import {Col, Container, Nav, Row} from "react-bootstrap";
import Home from "./home/Home";

export default class App extends React.Component<{}, {}> {

    render() {
        return (
            <div className="app">
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