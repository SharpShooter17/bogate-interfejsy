import * as Keycloak from "keycloak-js";
import {KeycloakInitOptions} from "keycloak-js";

export const initConfig: KeycloakInitOptions = {
    onLoad: 'login-required',
    flow: 'standard',
    checkLoginIframe: false
};

// @ts-ignore
export const keycloak: Keycloak.KeycloakInstance = Keycloak({
    clientId: "frontend-simple-app",
    realm: "Simple-app",
    url: "http://simple-app:8080/auth"
});