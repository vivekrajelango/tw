import { userDetailsTypes as types } from '@/types/userDetails/userDetails';
import _ from 'lodash';
import { ClientSearchResponse,ClientSearchResults } from '@/types/Schema';

export interface UserAppState {
  clientSearchStatus: boolean,
  clientSearchResults: ClientSearchResults[],
  clientDetailsStatus: boolean,
  clientDetailsResults: any;
  matterSearchStatus: boolean,
  matterSearchResults: any,
  matterDetailsStatus: boolean,
  matterDetailsResults: any,
}

const initialState: UserAppState = {
  clientSearchStatus: false,
  clientSearchResults:[],
  clientDetailsStatus: false,
  clientDetailsResults: null,
  matterSearchStatus: false,
  matterSearchResults: null,
  matterDetailsStatus: false,
  matterDetailsResults: null,
};


export default function actionReducer(
  state = initialState,
  { type, payload }: { type: string; payload: any }
): any {
  switch (type) {

    //Get Client Search
    case types.CLIENT_SEARCH_PENDING: {
      return {
        ...state,
        clientSearchStatus:true
      }
    }
    case types.CLIENT_SEARCH_FULFILLED: {
      return {
        ...state,
        clientSearchStatus:false,
        clientSearchResults: payload.results,
      }
    }
    case types.CLIENT_SEARCH_REJECTED: {
      return {
        ...state,
        clientSearchStatus:false
      }
    }

    //Get Client Details By Id
    case types.CLIENT_DETAILS_BY_ID_PENDING: {
      return {
        ...state,
        clientDetailsStatus:true
      }
    }
    case types.CLIENT_DETAILS_BY_ID_FULFILLED: {
      return {
        ...state,
        clientDetailsStatus: false,
        clientDetailsResults: payload.data
      }
    }
    case types.CLIENT_DETAILS_BY_ID_REJECTED: {
      return {
        ...state,
        clientDetailsStatus:false
      }
    }

    //Get Matter Search
    case types.MATTER_SEARCH_PENDING: {
      return {
        ...state,
        matterSearchStatus:true
      }
    }
    case types.MATTER_SEARCH_FULFILLED: {
      return {
        ...state,
        matterSearchStatus:false,
        matterSearchResults: payload.results,
      }
    }
    case types.MATTER_SEARCH_REJECTED: {
      return {
        ...state,
        matterSearchStatus:false
      }
    }

    //Get Matter Details By Id
    case types.MATTER_DETAILS_BY_ID_PENDING: {
      return {
        ...state,
        matterDetailsStatus:true
      }
    }
    case types.MATTER_DETAILS_BY_ID_FULFILLED: {
      return {
        ...state,
        matterDetailsStatus: false,
        matterDetailsResults: payload.data
      }
    }
    case types.MATTER_DETAILS_BY_ID_REJECTED: {
      return {
        ...state,
        matterDetailsStatus:false
      }
    }
    
    default:
      return state;
  }
}
