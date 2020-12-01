export default interface UserInfo {
    readonly username: string;
    readonly surname: string | null;
    readonly name: string | null;
    readonly email: string | null;
    readonly roles: string[];
    readonly props: {
        [key: string]: any
    };
}

export class User implements UserInfo {

    readonly email: string | null;
    readonly name: string | null;
    readonly props: { [p: string]: any };
    readonly roles: string[];
    readonly surname: string | null;
    readonly username: string;

    constructor(data: UserInfo) {
        this.email = data.email;
        this.name = data.name;
        this.props = data.props;
        this.roles = data.roles;
        this.surname = data.surname;
        this.username = data.username;
    }

    isAdmin(): boolean {
        return this.roles.includes(adminRole);
    }

    isModerator(): boolean {
        return this.roles.includes(moderatorRole);
    }
}

const adminRole = "ROLE_SIMPLE_APP_ADMIN";
const moderatorRole = "ROLE_SIMPLE_APP_MODERATOR";