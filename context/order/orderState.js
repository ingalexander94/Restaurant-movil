import React, {useReducer} from 'react';
import {
  ADD_ORDER,
  SELECT_SAUCER,
  CALCULATE_TOTAL,
  DELETE_SAUCER,
  SAVE_ID_REQUEST,
  RESET_ORDER,
} from '../../types/types';
import OrderContext from './orderContext';
import OrderReducer from './orderReducer';

const OrderState = (props) => {
  const initialState = {
    orders: [],
    selectedSaucer: null,
    totalPay: 0,
    idRequest: '',
  };

  const [state, dispatch] = useReducer(OrderReducer, initialState);

  const selectSaucer = (saucer) =>
    dispatch({
      type: SELECT_SAUCER,
      payload: saucer,
    });

  const addSaucer = (order) =>
    dispatch({
      type: ADD_ORDER,
      payload: order,
    });

  const calculateTotal = (orders = []) => {
    const total = orders.reduce((acc, curr) => acc + curr.total, 0);
    dispatch({
      type: CALCULATE_TOTAL,
      payload: total,
    });
  };

  const deleteSaucer = (id) =>
    dispatch({
      type: DELETE_SAUCER,
      payload: id,
    });

  const saveIdRequest = (id) =>
    dispatch({
      type: SAVE_ID_REQUEST,
      payload: id,
    });

  const resetOrder = () => {
    dispatch({
      type: RESET_ORDER,
    });
  };

  return (
    <OrderContext.Provider
      value={{
        orders: state.orders,
        selectedSaucer: state.selectedSaucer,
        totalPay: state.totalPay,
        idRequest: state.idRequest,
        selectSaucer,
        addSaucer,
        calculateTotal,
        deleteSaucer,
        saveIdRequest,
        resetOrder,
      }}>
      {props.children}
    </OrderContext.Provider>
  );
};

export default OrderState;
