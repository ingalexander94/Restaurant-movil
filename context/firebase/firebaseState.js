import React, {useReducer} from 'react';
import {
  onLoadProductsFirestore,
  onMyOrdersFirestore,
} from '../../helpers/firestore';
import {
  LISTEN_ORDERS,
  LISTEN_PRODUCTS,
  SET_USER_AUTH,
  UNSET_USER_AUTH,
} from '../../types/types';
import FirebaseContext from './firebaseContext';
import FirebaseReducer from './firebaseReducer';

const FirebaseState = (props) => {
  const initialState = {
    menu: [],
    orders: [],
    user: null,
  };

  const [state, dispatch] = useReducer(FirebaseReducer, initialState);

  const listenProducts = async () => {
    await onLoadProductsFirestore((res) => {
      dispatch({
        type: LISTEN_PRODUCTS,
        payload: res,
      });
    });
  };

  const listenMyOrders = async (uidClient) => {
    await onMyOrdersFirestore(uidClient, (res) => {
      dispatch({
        type: LISTEN_ORDERS,
        payload: res,
      });
    });
  };

  const addUserAuth = (user) =>
    dispatch({
      type: SET_USER_AUTH,
      payload: user,
    });

  const removeUserAuth = () =>
    dispatch({
      type: UNSET_USER_AUTH,
    });

  return (
    <FirebaseContext.Provider
      value={{
        menu: state.menu,
        orders: state.orders,
        user: state.user,
        listenProducts,
        listenMyOrders,
        addUserAuth,
        removeUserAuth,
      }}>
      {props.children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseState;
