import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, TouchableWithoutFeedback, Keyboard} from 'react-native';
import {useNavigation} from '@react-navigation/native';
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
import OrderContext from '../context/order/orderContext';
import globalStyles from '../styles/global';
import {confirmationAlert} from '../helpers/alerts';

export const FormSaucer = () => {
  // Hooks
  const [counter, setCounter] = useState(1);
  const [total, setTotal] = useState(0);
  const [notes, setNotes] = useState('');
  const {selectedSaucer, addSaucer} = useContext(OrderContext);

  useEffect(() => {
    const calculate = calculateTotal();
    return () => {
      calculate;
    };
  }, [counter]);

  const navigation = useNavigation();

  // Funciones
  const addQuantity = () => setCounter(counter + 1);
  const removeQuantity = () => counter > 1 && setCounter(counter - 1);
  const calculateTotal = () => setTotal(counter * selectedSaucer.price);
  const saveQuantity = (quantity) =>
    quantity !== '' ? setCounter(parseInt(quantity)) : setCounter(quantity);

  const reset = () => {
    if (counter === '' || counter === 0) {
      setCounter(1);
    }
  };

  const confirmOrder = () => {
    const order = {
      ...selectedSaucer,
      quantity: counter,
      total,
      notes,
    };
    addSaucer(order);
    navigation.navigate('Summary');
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <Container style={globalStyles.container}>
          <Content style={globalStyles.content}>
            <Form>
              <Text style={globalStyles.title}>Cantidad</Text>
              <Grid>
                <Col>
                  <Button
                    warning
                    style={styles.buttonQuantity}
                    onPress={removeQuantity}
                    disabled={counter < 2}>
                    <Icon name="remove" style={styles.textQuantity} />
                  </Button>
                </Col>
                <Col>
                  <Input
                    value={`${counter}`}
                    keyboardType="numeric"
                    style={styles.textQuantity}
                    onChangeText={saveQuantity}
                    onBlur={reset}
                  />
                </Col>
                <Col>
                  <Button
                    warning
                    style={styles.buttonQuantity}
                    onPress={addQuantity}>
                    <Icon name="add" style={styles.textQuantity} />
                  </Button>
                </Col>
              </Grid>
              <Text style={[globalStyles.price, globalStyles.textWhite]}>
                Subtotal: ${total}
              </Text>
              <Textarea
                rowSpan={12}
                bordered
                style={globalStyles.input}
                value={notes}
                placeholder="¿ Con todo ? Escribanos aquí una nota para saber como preparar su pedido"
                onChangeText={(text) => setNotes(text)}></Textarea>
            </Form>
          </Content>

          <Footer>
            <FooterTab>
              <Button
                style={globalStyles.buttonNav}
                block
                onPress={() =>
                  confirmationAlert(
                    '¿ Desea agregar esta orden a su pedido ?',
                    'Puede modificar esta acción más adelante',
                    confirmOrder,
                  )
                }>
                <Text style={globalStyles.buttonTextNav}>
                  Agregar al pedido
                </Text>
              </Button>
            </FooterTab>
          </Footer>
        </Container>
      </TouchableWithoutFeedback>
    </>
  );
};

// Estilos del componente
const styles = StyleSheet.create({
  buttonQuantity: {
    height: 80,
    justifyContent: 'center',
    width: '100%',
  },
  textQuantity: {
    fontSize: 40,
    textAlign: 'center',
  },
});
