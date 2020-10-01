import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Button, Container, H1, H3, Text, View} from 'native-base';
import Countdown from 'react-countdown';
import {useNavigation} from '@react-navigation/native';
import OrderContext from '../context/order/orderContext';
import {onOrderComplete} from '../helpers/firestore';
import globalStyles from '../styles/global';

export const Progress = () => {
  const {idRequest} = useContext(OrderContext);
  const [timer, setTimer] = useState(0);
  const [isComplete, saveIsComplete] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    onOrderComplete(idRequest, ({newTimer, complete}) => {
      setTimer(newTimer);
      saveIsComplete(complete);
    });
  }, []);

  const render = ({minutes, seconds}) => (
    <Text style={styles.time}>
      {minutes}:{seconds}
    </Text>
  );

  return (
    <Container style={globalStyles.container}>
      <View style={[globalStyles.content, {marginTop: 50}]}>
        {timer === 0 && (
          <>
            <Text style={{textAlign: 'center', color: 'white'}}>
              Hemos recibido su pedido
            </Text>
            <Text style={{textAlign: 'center', color: 'white'}}>
              Estamos calculando el tiempo de entrega
            </Text>
          </>
        )}

        {!isComplete && timer > 0 && (
          <>
            <Text style={{textAlign: 'center', color: 'white'}}>
              Su pedido estará listo en:
            </Text>
            <Countdown
              date={Date.now() + timer * 60000}
              renderer={render}></Countdown>
            <Text style={{textAlign: 'center', color: 'white'}}>Minutos</Text>
          </>
        )}

        {isComplete && (
          <>
            <H1 style={styles.textFinish}>Pedido terminado</H1>
            <H3 style={styles.textFinish}>
              Por favor, pase a recoger su pedido
            </H3>
            <Button
              info
              block
              style={{marginTop: 50}}
              onPress={() => navigation.navigate('NewOrder')}>
              <Text style={globalStyles.uppercase}>
                Comenzar una nueva orden
              </Text>
            </Button>
          </>
        )}
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  time: {
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 60,
    marginTop: 30,
  },
  textFinish: {
    textAlign: 'center',
    textTransform: 'uppercase',
    color: 'white',
    marginBottom: 20,
  },
});
