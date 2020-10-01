import 'react-native-gesture-handler';
import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {NewOrder} from './views/NewOrder';
import {Menu} from './views/Menu';
import FirebaseState from './context/firebase/firebaseState';
import OrderState from './context/order/orderState';
import {DetailProduct} from './views/DetailProduct';
import {FormSaucer} from './views/FormSaucer';
import {Summary} from './views/Summary';
import {TouchableHighlight} from 'react-native-gesture-handler';
import {Redirect} from './views/Redirect';
import {Progress} from './views/Progress';

const Stack = createStackNavigator();

const App = () => {
  return (
    <>
      <FirebaseState>
        <OrderState>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerStyle: {
                  backgroundColor: '#343a40',
                },
                headerTintColor: '#17a2b8',
                headerTitleStyle: {
                  fontWeight: 'bold',
                  textAlign: 'center',
                  color: 'white',
                },
              }}>
              <Stack.Screen
                name="NewOrder"
                component={NewOrder}
                options={{title: 'Nueva Orden'}}
              />
              <Stack.Screen
                name="Menu"
                component={Menu}
                options={{
                  title: 'Nuestro Menú',
                  headerRight: (props) => (
                    <TouchableHighlight>
                      <Redirect></Redirect>
                    </TouchableHighlight>
                  ),
                }}
              />
              <Stack.Screen
                name="DetailProduct"
                component={DetailProduct}
                options={{title: 'Detalles del platillo'}}
              />
              <Stack.Screen
                name="FormSaucer"
                component={FormSaucer}
                options={{title: 'Ordenar platillo'}}
              />
              <Stack.Screen
                name="Summary"
                component={Summary}
                options={{title: 'Resumen de la compra'}}
              />
              <Stack.Screen
                name="Progress"
                component={Progress}
                options={{title: 'Progreso del pedido'}}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </OrderState>
      </FirebaseState>
    </>
  );
};

export default App;
