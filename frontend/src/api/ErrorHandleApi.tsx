import BaseApi from "./BaseApi"
import {IRestResponse} from "typed-rest-client/RestClient";
import {toast} from "react-toastify";

class ErrorHandleApi extends BaseApi {

    constructor(backendUrl: string, baseUrl: string, useKeycloak: boolean = false) {
        super(backendUrl, baseUrl, useKeycloak);
    }

    public get<T>(path: string, headers: Map<string, string> = new Map<string, string>()): Promise<T> {
        return super.get<T>(path)
            .then(ErrorHandleApi.retrieveData)
            .catch(ErrorHandleApi.handleError)
    }

    public post<T>(path: string, entity: any): Promise<T> {
        return super.post<T>(path, entity)
            .then(ErrorHandleApi.retrieveData)
            .catch(ErrorHandleApi.handleError);
    }

    public put<T>(path: string, entity: any): Promise<T> {
        return super.put<T>(path, entity)
            .then(ErrorHandleApi.retrieveData)
            .catch(ErrorHandleApi.handleError);
    }

    public delete<T>(path: string) {
        return super.delete<T>(path)
            .then(ErrorHandleApi.retrieveData)
            .catch(ErrorHandleApi.handleError);
    }

    public patch<T>(path: string, entity: any): Promise<T> {
        return super.patch<T>(path, entity)
            .then(ErrorHandleApi.retrieveData)
            .catch(ErrorHandleApi.handleError);
    }

    private static handleError(reason: any) {
        const statusCode = reason.statusCode;
        if (statusCode < 200 || statusCode > 299) {
            toast.error(reason.message);
            return Promise.reject(reason.message);
        }
        return reason;
    }

    private static retrieveData<T>(response: IRestResponse<T>) {
        if (response.statusCode < 300 && response.statusCode >= 200) {
            return response.result;
        }
    }
}

export default ErrorHandleApi