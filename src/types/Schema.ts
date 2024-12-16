
export interface ClientSearchResponse {
    totalResults: number;
    returnedResults: number;
    filter: string;
    offset: number;
    index: number;
    orderBy: string;
    searchOrder: string;
    searchError: string,
    results:[]
  }

  export interface ClientSearchResults {
      clientId: string,
      name: string,
      code: string,
      inception: string,
      matterCount: number
  }