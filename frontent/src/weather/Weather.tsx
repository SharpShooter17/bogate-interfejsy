import React from "react";
import {CurrentResponse} from "openweathermap-ts/dist/types";
import {Button, Col, Form, Row} from "react-bootstrap";
import WeatherApi from "./WeatherApi";
import WeatherDetails from "./WeatherDetails";
import {toast} from "react-toastify";

export interface WeatherState {
    weather: CurrentResponse | null;
    city: string
}

export default class Weather extends React.Component<{}, WeatherState> {

    constructor(props: {}) {
        super(props);
        this.state = {
            weather: null,
            city: ''
        }
    }

    render({city, weather} = this.state) {
        return (
            <div>
                <Row>
                    <Col>
                        <Form onSubmit={event => {
                            event.preventDefault();
                            WeatherApi.currentWeather(city)
                                .then(r => this.setState({weather: r}))
                        }}>
                            <Form.Row>
                                <Col sm={2}>
                                    <Form.Label>Pogoda dla miasta</Form.Label>
                                </Col>
                                <Col sm={8}>
                                    <Form.Control type="text"
                                                  placeholder="Miasto"
                                                  value={city ?? ""}
                                                  onChange={event => this.setState({city: event.target.value})}/>
                                    <Form.Text className="text-muted">
                                        Wpisz miasto dla którego chceesz zobaczyć pogode
                                    </Form.Text>
                                </Col>
                                <Col sm={2}>
                                    <Button type="submit">Pokaż pogodę</Button>
                                </Col>
                            </Form.Row>
                        </Form>
                    </Col>
                </Row>
                <Row className="mt-3">
                    {weather && <WeatherDetails weather={weather}/>}
                </Row>
            </div>
        )
    }

}