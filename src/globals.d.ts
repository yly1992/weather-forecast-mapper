declare const process: {
  env: {
    NODE_ENV: 'production' | 'development' | 'test';
  };
};

declare const __DEV__: boolean;
declare const __PROD__: boolean;
declare const __TEST__: boolean;

interface Dict<T> {
  [key: string]: T;
}

interface Window {
  ga(...args: any[]): void;
}

declare module 'fetch-jsonp' {
  interface FetchOptions {
    mode?: 'same-origin' | 'cors' | 'no-cors' | 'navigate' | 'websocket';
  }
  interface FetchResponse {
    json(): Promise<any>;
  }
  const fetch: (url: string, opts?: FetchOptions) => Promise<FetchResponse>;
  export = fetch;
}

declare module 'react-addons-shallow-compare' {
  const m: any;
  export = m;
}