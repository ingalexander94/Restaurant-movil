import React, {useReducer} from 'react';
import {onLoadProductsFirestore} from '../../helpers/firestore';
import FirebaseContext from './firebaseContext';
import FirebaseReducer from './firebaseReducer';
import {LISTEN_PRODUCTS} from '../../types/types';

const FirebaseState = (props) => {
  const initialState = {
    menu: [],
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

  return (
    <FirebaseContext.Provider
      value={{
        menu: state.menu,
        listenProducts,
      }}>
      {props.children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseState;
