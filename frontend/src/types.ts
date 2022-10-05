export type Country = {
    Country: string;
    CountryCode:string;
    Date: string;
    ID: string;
    NewConfirmed: number;
    NewDeaths: number;
    NewRecovered: number;
    Premium: unknown;
    Slug: string;
    TotalConfirmed: number;
    TotalDeaths: number;
    TotalRecovered: number;
}

export type GlobalData = {
    Data: string;
    NewConfirmed: number;
    NewDeaths: number;
    NewRecovered: number;
    TotalConfirmed: number;
    TotalDeaths: number;
    TotalRecovered: number;
}

export type responseData = {
    Countries: Country[];
    Date: string;
    Global: GlobalData;
    ID: string;
    message: string;
    
}