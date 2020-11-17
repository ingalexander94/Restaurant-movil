import React, {useContext, useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {createStackNavigator} from '@react-navigation/stack';
import {TouchableHighlight} from 'react-native-gesture-handler';
import {NewOrder} from './views/NewOrder';
import {Menu} from './views/Menu';
import Redirect from './views/Redirect';
import {MyBuys} from './views/MyBuys';
import {DetailProduct} from './views/DetailProduct';
import {FormSaucer} from './views/FormSaucer';
import {Summary} from './views/Summary';
import {Progress} from './views/Progress';
import {Login} from './views/Auth/Login';
import {Register} from './views/Auth/Register';
import {Loading} from './views/Loading';
import FirebaseContext from './context/firebase/firebaseContext';

const Stack = createStackNavigator();

export const Router = () => {
  // Hooks
  const {addUserAuth} = useContext(FirebaseContext);
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  // Funciones
  function onAuthStateChanged(userAuth) {
    setUser(userAuth);
    if (userAuth) {
      const {displayName, uid, email} = userAuth;
      addUserAuth({displayName, uid, email});
    }
    if (initializing) setInitializing(false);
  }

  if (initializing) return <Loading />;

  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#FFBA5C',
          },
          headerTintColor: 'white',
          headerTitleStyle: {
            textAlign: 'center',
            color: 'white',
            textTransform: 'uppercase',
          },
        }}>
        {user === null ? (
          <>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                title: 'Iniciar Sesión',
                headerTransparent: true,
                headerTitle: false,
              }}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{
                title: 'Registrarse',
                headerTransparent: true,
                headerTitle: false,
                headerLeft: null,
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="NewOrder"
              component={NewOrder}
              options={{
                title: 'Nueva Orden',
                headerRight: (props) => (
                  <TouchableHighlight>
                    <Redirect typeRedirect={'myShopping'}></Redirect>
                  </TouchableHighlight>
                ),
              }}
            />
            <Stack.Screen
              name="Menu"
              component={Menu}
              options={{
                title: 'Nuestro Menú',
                headerRight: (props) => (
                  <TouchableHighlight>
                    <Redirect typeRedirect={'summary'}></Redirect>
                  </TouchableHighlight>
                ),
              }}
            />
            <Stack.Screen
              name="MyBuys"
              component={MyBuys}
              options={{
                title: 'Mis compras',
              }}
            />
            <Stack.Screen
              name="DetailProduct"
              component={DetailProduct}
              options={{
                title: 'Detalles',
              }}
            />
            <Stack.Screen
              name="FormSaucer"
              component={FormSaucer}
              options={{title: '', headerTransparent: true}}
            />
            <Stack.Screen
              name="Summary"
              component={Summary}
              options={{title: '', headerTransparent: true, headerLeft: null}}
            />
            <Stack.Screen
              name="Progress"
              component={Progress}
              options={{
                title: 'Progreso del pedido',
                headerLeft: null,
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </>
  );
};
