export interface RedditInfo {
    userName: string,
    userPassword: string,
    clientID: string,
    secretID: string
}

export interface NavBarElementListProps {
    navBarElements: Array<NavBarElement>;
}

export interface NavBarElement {
    name: string,
    url: string
}

export interface SearchProp{
    accessToken?: string
}