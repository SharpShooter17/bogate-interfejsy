import * as rm from "typed-rest-client/RestClient";
import {IRestResponse} from "typed-rest-client/RestClient";

class BaseApi {

    baseUrl: string;
    rest: rm.RestClient;

    constructor(backendUrl: string, baseUrl: string) {
        this.rest = new rm.RestClient("simple-frontend-app", backendUrl);
        this.baseUrl = baseUrl;
    }

    public get<T>(path: string): Promise<IRestResponse<T>> {
        return this.rest.get<T>(this.baseUrl + path);
    }

    public post<T>(path: string, entity: any): Promise<IRestResponse<T>> {
        return this.rest.create<T>(this.baseUrl + path, entity);
    }

    public put<T>(path: string, entity: any): Promise<IRestResponse<T>> {
        return this.rest.replace<T>(this.baseUrl + path, entity);
    }

    public delete<T>(path: string): Promise<IRestResponse<T>> {
        return this.rest.del<T>(this.baseUrl + path);
    }

    public patch<T>(path: string, entity: any): Promise<IRestResponse<T>> {
        return this.rest.update(this.baseUrl + path, entity);
    }

}

export default BaseApi;