import React, {useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Image} from 'react-native';
import {
  Body,
  Button,
  Card,
  CardItem,
  Container,
  Content,
  Footer,
  FooterTab,
  H1,
  Text,
} from 'native-base';
import OrderContext from '../context/order/orderContext';
import globalStyles from '../styles/global';

export const DetailProduct = () => {
  // Hooks
  const {selectedSaucer} = useContext(OrderContext);
  const navigation = useNavigation();

  const {name, description, price, image} = selectedSaucer;

  return (
    <>
      <Container style={globalStyles.container}>
        <Content style={globalStyles.content}>
          <H1 style={globalStyles.title}> {name} </H1>
          <Card>
            <CardItem>
              <Body>
                <Image style={globalStyles.image} source={{uri: image}} />
                <Text style={globalStyles.textGray}>{description}</Text>
                <Text style={globalStyles.m2}>
                  <Text style={globalStyles.price}>Precio: </Text>${price}
                </Text>
              </Body>
            </CardItem>
          </Card>
        </Content>

        <Footer>
          <FooterTab>
            <Button
              block
              style={globalStyles.buttonNav}
              onPress={() => navigation.navigate('FormSaucer')}>
              <Text style={globalStyles.buttonTextNav}>PEDIR PLATILLO</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    </>
  );
};
