export interface candlestick {
    day: string;
    low: number;
    open: number;
    close: number;
    high: number;
  }


export interface metadata {
    info: string;
    symbol: string;
    refresh: string;
    size: string;
    zone: string;
}

export interface stamp {
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
}

export interface series {
    list: stamp;
}


export interface json {
    meta: metadata;
    values: series;
}