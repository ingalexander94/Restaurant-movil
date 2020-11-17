import {
  ADD_ORDER,
  CALCULATE_TOTAL,
  SELECT_SAUCER,
  DELETE_SAUCER,
  SAVE_ID_REQUEST,
  RESET_ORDER,
} from '../../types/types';

const OrderReducer = (state, actions) => {
  switch (actions.type) {
    case SELECT_SAUCER:
      return {
        ...state,
        selectedSaucer: {...actions.payload},
      };

    case ADD_ORDER:
      return {
        ...state,
        orders: [...state.orders, {...actions.payload}],
      };

    case CALCULATE_TOTAL:
      return {
        ...state,
        totalPay: actions.payload,
      };

    case DELETE_SAUCER:
      return {
        ...state,
        orders: state.orders.filter((order) => order.id !== actions.payload),
      };

    case SAVE_ID_REQUEST:
      return {
        ...state,
        orders: [],
        totalPay: 0,
        idRequest: actions.payload,
      };

    case RESET_ORDER:
      return {
        ...state,
        orders: [],
        selectedSaucer: null,
        totalPay: 0,
        idRequest: '',
      };

    default:
      return state;
  }
};

export default OrderReducer;
