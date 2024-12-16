import { routePath } from '@/constants/api';
import apiClient from './api';
import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';

interface ClientSearchResponse {
  totalResults: number;
  returnedResults: number;
  filter: string;
  offset: number;
  index: number;
  orderBy: string;
  searchOrder: string;
}


export const getData = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  try {
    const response = await apiClient.get<T>(url, config);
    return response.data;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};


export const postData = async <T, R>(url: string, data: T, config?: AxiosRequestConfig): Promise<R> => {
  try {
    const response = await apiClient.post<R>(url, data, config);
    return response.data;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const searchClients = async (
  name: string,
  options?: {
    searchText?: string,
    orderBy?: string;
    sort?: 'ASCENDING' | 'DESCENDING';
    index?:number,
    offset?: number;

  }
): Promise<ClientSearchResponse> => {
  try {
    const response: AxiosResponse<ClientSearchResponse> = await apiClient.get(
      `${routePath.CLIENT_SEARCH}/${options?.searchText ? options?.searchText : '{*}'}/${options?.orderBy}/${options?.sort}/${options?.index}/${options?.offset}`
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`API Error: ${error.message}`);
    }
    throw error;
  }
};

export const searchMatter = async (
  name: string,
  options?: {
    clientId?: string,
    orderBy?: string;
    sort?: 'ASCENDING' | 'DESCENDING';
    index?:number,
    offset?: number;

  }
): Promise<ClientSearchResponse> => {
  try {
    const response: AxiosResponse<ClientSearchResponse> = await apiClient.get(
      `${routePath.MATTER_SEARCH}/${options?.clientId}/${options?.orderBy}/${options?.sort}/${options?.index}/${options?.offset}`
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`API Error: ${error.message}`);
    }
    throw error;
  }
};
