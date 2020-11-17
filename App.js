import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Router} from './Router';
import {StatusBar} from 'react-native';
import OrderState from './context/order/orderState';
import FirebaseState from './context/firebase/firebaseState';
import UIState from './context/ui/uiState';

const App = () => {
  StatusBar.setBackgroundColor('#FF9709');
  return (
    <>
      <FirebaseState>
        <OrderState>
          <UIState>
            <NavigationContainer>
              <Router />
            </NavigationContainer>
          </UIState>
        </OrderState>
      </FirebaseState>
    </>
  );
};

export default App;
