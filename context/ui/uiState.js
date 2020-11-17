import React, {useReducer} from 'react';
import {FINISH_LOADING, START_LOADING} from '../../types/types';
import UIContext from './uiContext';
import UIReducer from './uiReducer';

const UIState = (props) => {
  const initialState = {
    loading: false,
  };

  const [state, dispatch] = useReducer(UIReducer, initialState);

  const startLoading = () =>
    dispatch({
      type: START_LOADING,
    });

  const finishLoading = () =>
    dispatch({
      type: FINISH_LOADING,
    });

  return (
    <UIContext.Provider
      value={{
        loading: state.loading,
        startLoading,
        finishLoading,
      }}>
      {props.children}
    </UIContext.Provider>
  );
};

export default UIState;
