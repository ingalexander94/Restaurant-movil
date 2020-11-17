import React, {useContext, useEffect} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Container, Button, Text, Icon, Thumbnail} from 'native-base';
import {hasOrder, logout} from '../helpers/firestore';
import {Loading} from './Loading';
import FirebaseContext from '../context/firebase/firebaseContext';
import OrderContext from '../context/order/orderContext';
import UIContext from '../context/ui/uiContext';
import globalStyles from '../styles/global';

// Assets
const img = {src: require('../assets/chef.png')};

export const NewOrder = () => {
  // Hooks
  const navigation = useNavigation();
  const {removeUserAuth, user, orders, listenMyOrders} = useContext(
    FirebaseContext,
  );
  const {saveIdRequest, resetOrder} = useContext(OrderContext);
  const {loading, startLoading, finishLoading} = useContext(UIContext);

  useEffect(() => {
    user && listenMyOrders(user.uid);
  }, [user]);

  useEffect(() => {
    if (orders.length > 0) {
      const myOrder = hasOrder(orders);
      if (myOrder) {
        saveIdRequest(myOrder.id);
        finishLoading();
        navigation.navigate('Progress');
      } else {
        finishLoading();
      }
    } else {
      finishLoading();
    }
  }, [orders]);

  useEffect(() => {
    startLoading();
  }, []);

  // Funciones
  const startLogout = () => {
    removeUserAuth();
    resetOrder();
    logout();
  };

  if (loading) return <Loading />;

  return (
    <>
      <ScrollView>
        <Container style={globalStyles.container}>
          <View style={[globalStyles.content, globalStyles.centerContent]}>
            <Text style={globalStyles.title}>
              ¡Buena
              <Text style={globalStyles.subtitle}> Comida</Text>
            </Text>
            <Text style={globalStyles.subtitle}>
              Gran
              <Text style={globalStyles.title}> Vida!</Text>
            </Text>
            <Thumbnail style={globalStyles.image} source={img.src} />
            <View style={styles.buttons}>
              <Button
                style={globalStyles.button}
                block
                onPress={() => navigation.navigate('Menu')}>
                <Text style={globalStyles.uppercase}>Crear orden</Text>
                <Icon name="arrow-forward-outline"></Icon>
              </Button>
              <Button
                block
                bordered
                style={globalStyles.buttonOutline}
                onPress={startLogout}>
                <Text
                  style={
                    (globalStyles.uppercase, globalStyles.buttonOutlineText)
                  }>
                  Cerrar sesión
                </Text>
                <Icon name="power-outline" style={styles.iconColor}></Icon>
              </Button>
            </View>
          </View>
        </Container>
      </ScrollView>
    </>
  );
};

// Estilos del componente
const styles = StyleSheet.create({
  buttons: {
    marginTop: 20,
  },
  iconColor: {
    color: '#FFBA5C',
  },
});
