import {
  Body,
  Button,
  Card,
  CardItem,
  Col,
  Container,
  Content,
  Footer,
  FooterTab,
  Grid,
  H1,
  Text,
} from 'native-base';
import React, {useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Image} from 'react-native';
import OrderContext from '../context/order/orderContext';
import globalStyles from '../styles/global';

export const DetailProduct = () => {
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
                <Text style={{marginTop: 20}}>{description}</Text>
                <Grid>
                  <Col>
                    <Text style={globalStyles.price}>${price}</Text>
                  </Col>
                </Grid>
              </Body>
            </CardItem>
          </Card>
        </Content>

        <Footer>
          <FooterTab>
            <Button
              info
              block
              onPress={() => navigation.navigate('FormSaucer')}>
              <Text style={globalStyles.textWhite}>Ordenar Platillo</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    </>
  );
};
