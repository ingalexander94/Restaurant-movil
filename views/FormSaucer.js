import {
  Button,
  Col,
  Container,
  Content,
  Footer,
  FooterTab,
  Form,
  Grid,
  Icon,
  Input,
  Text,
  Textarea,
} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import React, {useContext, useEffect, useState} from 'react';
import OrderContext from '../context/order/orderContext';
import globalStyles from '../styles/global';
import {Alert} from 'react-native';

export const FormSaucer = () => {
  const [counter, setCounter] = useState(1);
  const [total, setTotal] = useState(0);
  const [notes, setNotes] = useState('');
  const {selectedSaucer, addSaucer} = useContext(OrderContext);

  useEffect(() => {
    calculateTotal();
  }, [counter]);

  const navigation = useNavigation();

  const addQuantity = () => setCounter(counter + 1);

  const removeQuantity = () => counter > 1 && setCounter(counter - 1);

  const saveQuantity = (quantity) =>
    quantity !== '' ? setCounter(parseInt(quantity)) : setCounter(quantity);

  const reset = () => {
    if (counter === '' || counter === 0) {
      setCounter(1);
    }
  };

  const calculateTotal = () => setTotal(counter * selectedSaucer.price);

  const confirmOrder = () => {
    Alert.alert(
      '¿ Desea agregar esta orden a su pedido ?',
      'Puede modificar esta acción más adelante',
      [
        {
          text: 'Ni loc@',
          style: 'cancel',
        },
        {
          text: 'Confirmar',
          onPress: () => {
            const order = {
              ...selectedSaucer,
              quantity: counter,
              total,
              notes,
            };
            addSaucer(order);
            navigation.navigate('Summary');
          },
        },
      ],
    );
  };

  return (
    <>
      <Container style={globalStyles.container}>
        <Content style={globalStyles.content}>
          <Form>
            <Text style={globalStyles.title}>Cantidad</Text>
            <Grid>
              <Col>
                <Button
                  info
                  style={{height: 80, justifyContent: 'center', width: '100%'}}
                  onPress={removeQuantity}
                  disabled={counter < 2}>
                  <Icon name="remove" style={{fontSize: 40, color: 'black'}} />
                </Button>
              </Col>
              <Col>
                <Input
                  value={`${counter}`}
                  keyboardType="numeric"
                  style={{fontSize: 40, color: 'white', textAlign: 'center'}}
                  onChangeText={saveQuantity}
                  onBlur={reset}
                />
              </Col>
              <Col>
                <Button
                  info
                  style={{height: 80, justifyContent: 'center', width: '100%'}}
                  onPress={addQuantity}>
                  <Icon name="add" style={{fontSize: 40, color: 'black'}} />
                </Button>
              </Col>
            </Grid>
            <Text style={[globalStyles.price, globalStyles.textWhite]}>
              Subtotal: ${total}
            </Text>
            <Textarea
              rowSpan={12}
              bordered
              style={{color: 'white'}}
              value={notes}
              placeholder="¿ Con todo ? Escribanos aquí una nota para saber como lo quiere"
              onChangeText={(text) => setNotes(text)}></Textarea>
          </Form>
        </Content>

        <Footer>
          <FooterTab>
            <Button info block onPress={confirmOrder}>
              <Text style={globalStyles.textWhite}>Agregar al pedido</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    </>
  );
};
