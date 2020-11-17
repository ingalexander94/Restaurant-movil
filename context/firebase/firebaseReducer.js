import {
  LISTEN_ORDERS,
  LISTEN_PRODUCTS,
  SET_USER_AUTH,
  UNSET_USER_AUTH,
} from '../../types/types';

const FirebaseReducer = (state, actions) => {
  switch (actions.type) {
    case LISTEN_PRODUCTS:
      return {
        ...state,
        menu: [...actions.payload],
      };

    case LISTEN_ORDERS:
      return {
        ...state,
        orders: [...actions.payload],
      };

    case SET_USER_AUTH:
      return {
        ...state,
        user: {...actions.payload},
      };

    case UNSET_USER_AUTH:
      return {
        ...state,
        menu: [],
        orders: [],
        user: null,
      };

    default:
      return state;
  }
};

export default FirebaseReducer;
