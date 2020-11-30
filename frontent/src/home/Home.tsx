import React from "react";
import {User} from "../keycloak/UserInfo";
import {Card} from "react-bootstrap";

export interface HomeProps {
    user: User | null;
}

export default class Home extends React.PureComponent<HomeProps> {

    render({user} = this.props) {
        return <div>
            <h3>Strona startowa</h3>
            <p>Cześć, {user?.name}!</p>
            {user?.isModerator() && <Card border={"warning"}>
                <Card.Body>
                    <Card.Title>
                        Panel Moderatora
                    </Card.Title>
                </Card.Body>
            </Card>}
            {user?.isAdmin() && <Card border={"danger"}>
                <Card.Body>
                    <Card.Title>
                        Panel Administratora
                    </Card.Title>
                </Card.Body>
            </Card>}
        </div>;
    }

}