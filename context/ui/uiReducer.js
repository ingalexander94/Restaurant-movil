import {FINISH_LOADING, START_LOADING} from '../../types/types';

const UIReducer = (state, actions) => {
  switch (actions.type) {
    case START_LOADING:
      return {
        ...state,
        loading: true,
      };

    case FINISH_LOADING:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};

export default UIReducer;
