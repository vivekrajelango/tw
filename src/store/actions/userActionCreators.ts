import _ from 'lodash';
import { AxiosResponse } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { createAsyncAction, createAction } from 'redux-promise-middleware-actions';
import { userDetailsTypes } from '@/types/userDetails/userDetails';
import { searchClients, searchMatter, getData } from '@/utils/apiMethods';
import { routePath } from '@/constants/api';

export const clientSearch = createAsyncAction(
  userDetailsTypes.CLIENT_SEARCH,
  async (searchText, orderBy,sort,index, offset) => {
    const results = await searchClients('', {
      searchText,
      orderBy,
      sort,
      index,
      offset
    });
    return results;
  }
);

export const clientDetailsById = createAsyncAction(
  userDetailsTypes.CLIENT_DETAILS_BY_ID,
  async(clientId) =>{
    const response: AxiosResponse = await getData(routePath.CLIENT_DETAILS+clientId);
    return {data: response};
  }
);

export const matterSearch = createAsyncAction(
  userDetailsTypes.MATTER_SEARCH,
  async (clientId, orderBy,sort,index, offset) => {
    const results = await searchMatter('', {
      clientId,
      orderBy,
      sort,
      index,
      offset
    });
    return results;
  }
);

export const matterDetailsById = createAsyncAction(
  userDetailsTypes.MATTER_DETAILS_BY_ID,
  async(matterId) =>{
    const response: AxiosResponse = await getData(routePath.MATTER_DETAILS+matterId);
    return {data: response};
  }
);






