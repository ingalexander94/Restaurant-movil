import {LISTEN_PRODUCTS} from '../../types/types';

const FirebaseReducer = (state, actions) => {
  switch (actions.type) {
    case LISTEN_PRODUCTS:
      return {
        ...state,
        menu: [...actions.payload],
      };

    default:
      return state;
  }
};

export default FirebaseReducer;
