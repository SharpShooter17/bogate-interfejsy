import ErrorHandleApi from "../api/ErrorHandleApi";
import * as WeatherConfig from "./WeatherConfig";
import {CurrentResponse} from "openweathermap-ts/dist/types";

class WeatherApi extends ErrorHandleApi {

    constructor() {
        super(WeatherConfig.baseUrl, "")
    }

    public currentWeather(city: string): Promise<CurrentResponse> {
        return this.get<CurrentResponse>('weather?q=' + city + WeatherApi.additionalSettings())
    }

    private static additionalSettings(): string {
        return '&lang=' + WeatherConfig.lang + '&units=' + WeatherConfig.units + '&appid=' + WeatherConfig.apiKey;
    }

}

export default new WeatherApi();