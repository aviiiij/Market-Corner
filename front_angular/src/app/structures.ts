
export interface stamp {
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    timestamp: string;
}

export interface series {
    series: stamp[];
}

export interface earning {
    fiscalDateEnding : string,
    reportedEPS : number
}

export interface companyData {
    name : string,
    description : string,
    earnings : earning[],
    exchange : string,
    currency : string,
    sector : string
}