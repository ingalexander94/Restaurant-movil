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
  Text,
  Thumbnail,
} from 'native-base';
import React, {useContext, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import OrderContext from '../context/order/orderContext';
import globalStyles from '../styles/global';
import {Alert} from 'react-native';
import {sendOrder} from '../helpers/firestore';

export const Summary = () => {
  const {
    orders,
    totalPay,
    calculateTotal,
    deleteSaucer,
    saveIdRequest,
  } = useContext(OrderContext);

  const navigation = useNavigation();

  useEffect(() => {
    calculateTotal(orders);
  }, [orders, totalPay]);

  const redirectProgress = () => {
    Alert.alert(
      'Revise su pedido',
      'Sí confirma, se enviará a el cocinero para que lo prepare',
      [
        {
          text: 'Revisar',
          style: 'cancel',
        },
        {
          text: 'Confirmar',
          onPress: async () => {
            const orderObj = {
              timer: 0,
              complete: false,
              total: Number(totalPay),
              order: orders,
              create: Date.now(),
            };
            const id = await sendOrder(orderObj);
            saveIdRequest(id);
            navigation.navigate('Progress');
          },
        },
      ],
    );
  };

  const initDelete = (id) => {
    deleteSaucer(id);
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
                <ListItem thumbnail>
                  <Left>
                    <Thumbnail large square source={{uri: image}} />
                  </Left>
                  <Body>
                    <Text
                      style={[
                        globalStyles.textWhite,
                        globalStyles.uppercase,
                        {fontWeight: 'bold'},
                      ]}>
                      {name}
                    </Text>
                    <Text style={globalStyles.textWhite}>
                      Cantidad: {quantity}
                    </Text>
                    <Text style={globalStyles.textWhite}>Precio: ${price}</Text>
                    <Button
                      danger
                      block
                      style={{marginTop: 20}}
                      onPress={() => initDelete(id)}>
                      <Text> Eliminar </Text>
                    </Button>
                  </Body>
                </ListItem>
              </List>
            );
          })}

          <Text style={[globalStyles.price, globalStyles.textWhite]}>
            Total a pagar: ${totalPay}
          </Text>
          <Button
            primary
            block
            style={{marginTop: 10}}
            onPress={() => navigation.navigate('Menu')}>
            <Text>Seguir pidiendo</Text>
          </Button>
        </Content>

        <Footer>
          <FooterTab>
            <Button info block onPress={redirectProgress}>
              <Text style={globalStyles.textWhite}>Realizar Pedido</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    </>
  );
};
