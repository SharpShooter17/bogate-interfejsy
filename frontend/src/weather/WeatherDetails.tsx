import {CurrentResponse} from "openweathermap-ts/dist/types";
import React from "react";
import {Card, CardColumns, ListGroup} from "react-bootstrap";

export interface WeatherDetailsProps {
    weather: CurrentResponse
}

export default class WeatherDetails extends React.PureComponent<WeatherDetailsProps, {}> {

    render({weather} = this.props) {
        return (
            <div>
                <div>
                    <h4>Pogoda dla miasta {weather.name}
                        <small className="text-muted">
                            ({weather.coord.lat}, {weather.coord.lon}) {WeatherDetails.timestampToString(weather.dt)}
                        </small>
                    </h4>
                    <h5>
                        {weather.weather.map(w =>
                            <div key={"weather_description_" + w.id}>
                                <img alt="Ikona" src={"http://openweathermap.org/img/wn/" + w.icon + "@2x.png"}/>
                                {w.description}
                            </div>
                        )}
                    </h5>
                </div>
                <CardColumns>
                    <Card border="primary">
                        <Card.Body>
                            <Card.Title>
                                Temperatura {weather.main.temp}℃
                            </Card.Title>
                            <Card.Text>
                                <ListGroup>
                                    <ListGroup.Item>
                                        Temperatura minimalna: {weather.main.temp_min}℃
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        Temperatura maksymalna: {weather.main.temp_max}℃
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card border="primary">
                        <Card.Body>
                            <Card.Title>
                                Słońce
                            </Card.Title>
                            <Card.Text>
                                <ListGroup>
                                    <ListGroup.Item>
                                        Wschód: {WeatherDetails.timestampToString(weather.sys.sunrise)}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        Zachód: {WeatherDetails.timestampToString(weather.sys.sunset)}
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card border="primary">
                        <Card.Body>
                            <Card.Title>
                                Wiatr
                            </Card.Title>
                            <Card.Text>
                                <ListGroup>
                                    <ListGroup.Item>
                                        Prędkość wiatru: {weather.wind.speed}m/s
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        Kierunek wiatru: {WeatherDetails.windToTextualDescription(weather.wind.deg)}
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card border="primary">
                        <Card.Body>
                            <Card.Title>
                                Powietrze
                            </Card.Title>
                            <Card.Text>
                                <ListGroup>
                                    <ListGroup.Item>
                                        Wilgotność powietrza: {weather.main.humidity}%
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        Widoczność: {weather.visibility}m
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        Ciśnienie: {weather.main.pressure}hPa
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        Zachmurzenie: {weather.clouds.all}%
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </CardColumns>
            </div>
        )

    }

    private static windToTextualDescription(degree: number): string {
        if (degree > 337.5) return 'Północny';
        if (degree > 292.5) return 'Północno-zachodni';
        if (degree > 247.5) return 'Zachodni';
        if (degree > 202.5) return 'Południowo-zachodni';
        if (degree > 157.5) return 'Południowy';
        if (degree > 122.5) return 'Południowy wschodni';
        if (degree > 67.5) return 'Wschodni';
        if (degree > 22.5) return 'Północno wschodni';
        return 'Północny';
    }

    private static timestampToString(timestamp: number): string {
        // @ts-ignore
        const date = new Date(timestamp * 1000);
        return date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear() + ' ' +
            date.getHours() + ':' + date.getMinutes()
    }


}