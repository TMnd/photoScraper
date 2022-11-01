export interface DataSource{
    baseUrl:string,
    imageEndpoint:string,
    helpEndPoint:string,
    queryInfo:string,
    apiKey?:string
}

export interface IDictionary {
    [index:string]: DataSource;
}

export interface AnimalData {
    name: string,
    id?: string
}
