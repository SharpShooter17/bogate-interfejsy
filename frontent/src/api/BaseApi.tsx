import * as rm from "typed-rest-client/RestClient";
import {IRequestOptions, IRestResponse} from "typed-rest-client/RestClient";
import {IHeaders, IRequestQueryParams} from "typed-rest-client/Interfaces";
import {keycloak} from "../keycloak/keycloak";

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
        return this.rest.update(this.baseUrl + path, entity, BaseApi.options());
    }

    private static options(headers: Map<string, string> = new Map()): IRequestOptions {
        const opt = new class implements IRequestOptions {
            additionalHeaders?: IHeaders;
            acceptHeader?: string;
            responseProcessor?: Function;
            deserializeDates?: boolean;
            queryParameters?: IRequestQueryParams;
        }();

        opt.additionalHeaders =  {
            'Authorization': 'Bearer ' + keycloak.token,
            'Accept': 'application/json'
        };

        // @ts-ignore
        headers.forEach(((value, key) => opt.additionalHeaders[key] = value));
        return opt;
    }

}

export default BaseApi;