import React, {useContext, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Image} from 'react-native';
import {
  Body,
  Button,
  Container,
  Content,
  Footer,
  FooterTab,
  H1,
  Left,
  List,
  ListItem,
  Right,
  Text,
  Thumbnail,
} from 'native-base';
import {confirmationAlert, showAlertBackButton} from '../helpers/alerts';
import {sendOrder} from '../helpers/firestore';
import OrderContext from '../context/order/orderContext';
import FirebaseContext from '../context/firebase/firebaseContext';
import globalStyles from '../styles/global';

// Assets
const img = {src: require('../assets/total.png')};

export const Summary = () => {
  // Hooks
  const {
    orders,
    totalPay,
    calculateTotal,
    deleteSaucer,
    saveIdRequest,
  } = useContext(OrderContext);
  const {user} = useContext(FirebaseContext);
  const navigation = useNavigation();

  useEffect(() => {
    calculateTotal(orders);
  }, [orders, totalPay]);

  useEffect(() => {
    const backHandler = showAlertBackButton(
      'Atención!',
      'No se puede realizar esta acción.',
    );
    return () => backHandler.remove();
  }, []);

  // Funciones
  const initDelete = (id) => deleteSaucer(id);

  const redirectProgress = async () => {
    const orderObj = {
      timer: 0,
      complete: false,
      total: Number(totalPay),
      order: orders,
      uidClient: user.uid,
      nameClient: user.displayName,
      create: Date.now(),
    };
    const id = await sendOrder(orderObj);
    saveIdRequest(id);
    navigation.navigate('Progress');
  };

  return (
    <>
      <Container style={globalStyles.container}>
        <Content style={globalStyles.content}>
          <H1 style={globalStyles.title}> Su Pedido </H1>
          {orders.map((saucer, i) => {
            const {id, name, price, quantity, image} = saucer;
            return (
              <List key={id + i}>
                <ListItem avatar>
                  <Left>
                    <Image
                      style={globalStyles.imageProduct}
                      source={{uri: image}}
                    />
                  </Left>
                  <Body>
                    <Text
                      style={[globalStyles.uppercase, {fontWeight: 'bold'}]}>
                      {name}
                    </Text>
                    <Text note>Cantidad: {quantity}</Text>
                    <Text note>Precio: ${price}</Text>
                    <Button
                      bordered
                      block
                      small
                      style={[globalStyles.buttonOutline, globalStyles.m2]}
                      onPress={() => initDelete(id)}>
                      <Text style={globalStyles.buttonOutlineText}>Borrar</Text>
                    </Button>
                  </Body>
                </ListItem>
              </List>
            );
          })}

          <List>
            <ListItem avatar>
              <Left>
                <Image style={globalStyles.imageProduct} source={img.src} />
              </Left>
              <Body>
                <Text>{user.displayName}</Text>
                <Text note numberOfLines={1}>
                  Total a Pagar:
                </Text>
              </Body>
              <Right>
                <Text style={{fontWeight: 'bold'}}>${totalPay}</Text>
              </Right>
            </ListItem>
          </List>

          <Button
            block
            style={[globalStyles.button, globalStyles.m2]}
            onPress={() => navigation.navigate('Menu')}>
            <Text>Seguir pidiendo</Text>
          </Button>
        </Content>

        <Footer>
          <FooterTab>
            <Button
              style={globalStyles.buttonNav}
              block
              onPress={() =>
                confirmationAlert(
                  'Revise su pedido',
                  'Sí confirma, se enviará a el cocinero para que lo prepare',
                  redirectProgress,
                )
              }>
              <Text style={globalStyles.buttonTextNav}>Realizar Pedido</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    </>
  );
};
