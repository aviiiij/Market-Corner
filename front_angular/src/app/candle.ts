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
    timestamp: string;
}

export interface series {
    series: stamp[];
}


export interface json {
    meta: metadata;
    values: series;
}