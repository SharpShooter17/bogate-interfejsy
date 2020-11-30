import React from "react";
import {User} from "../keycloak/UserInfo";
import Loader from "../Loader";
import {Card, Col, Row} from "react-bootstrap";

export interface ProfileProps {
    user: User | null;
}

export default class Profile extends React.Component<ProfileProps, {}> {

    render({user} = this.props) {
        if (!user) {
            return <Loader/>
        }

        const roles = user.roles.flatMap((role: string) => [
            <Row>
                <Col sm={3}><h6>Rola</h6></Col>
                <Col className="text-secondary">{role}</Col>
            </Row>, <hr/>]);

        return (
            <div>
                <Card>
                    <Card.Body>
                        <Row>
                            <Col sm={3}><h6>Imie</h6></Col>
                            <Col className="text-secondary">{user?.name}</Col>
                        </Row>
                        <hr/>
                        <Row>
                            <Col sm={3}><h6>Nazwisko</h6></Col>
                            <Col className="text-secondary">{user?.surname}</Col>
                        </Row>
                        <hr/>
                        <Row>
                            <Col sm={3}><h6>Email</h6></Col>
                            <Col className="text-secondary">{user?.email}</Col>
                        </Row>
                        <hr/>
                        <Row>
                            <Col sm={3}><h6>Nazwa użytkownika</h6></Col>
                            <Col className="text-secondary">{user?.username}</Col>
                        </Row>
                        <hr/>
                        {roles}
                    </Card.Body>
                </Card>
            </div>
        );
    }
}