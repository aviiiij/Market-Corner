
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

export interface news {
    source : string,
    author : string,
    title : string,
    description : string,
    url : string,
    urlToImage : string,
    publishedAt : Date,
    content : string
}

export interface newsData {
    newsholder : news[]
}