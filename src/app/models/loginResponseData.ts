export interface LoginResponseData {
    name: string,
    token: string,
    role: string,
    loggedIn: boolean,
    email: string,
    expDate: number,
    id: number
}