import { addAsyncActionPostfixes } from '@/utils/actionTypeCreator';

export const userDetailsTypes = {
  ...addAsyncActionPostfixes({
    CLIENT_SEARCH: 'CLIENT_SEARCH',
    CLIENT_DETAILS_BY_ID: 'CLIENT_DETAILS_BY_ID',
    MATTER_SEARCH: 'MATTER_SEARCH',
    MATTER_DETAILS_BY_ID: 'MATTER_DETAILS_BY_ID'
  }),
  SAVE_CART: 'SAVE_CART',
};
