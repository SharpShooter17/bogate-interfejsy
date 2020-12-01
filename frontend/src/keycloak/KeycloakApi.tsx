import ErrorHandleApi from "../api/ErrorHandleApi";
import * as Config from "../Config"
import UserInfo, {User} from "./UserInfo";

class KeycloakApi extends ErrorHandleApi {
    constructor() {
        super(Config.backendUrl, "api/auth/", true);
    }

    public userInfo(): Promise<User> {
        return this.get<UserInfo>("user-info").then((u: UserInfo) => new User(u));
    }

}

export default new KeycloakApi();