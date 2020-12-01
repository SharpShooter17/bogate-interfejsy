import React from "react";
import {Spinner} from "react-bootstrap";


export default class Loader extends React.PureComponent {

    render() {
        return <Spinner animation="border" variant="primary"/>
    }

}