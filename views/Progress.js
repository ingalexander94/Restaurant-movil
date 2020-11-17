import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Countdown from 'react-countdown';
import {Button, Container, H1, H3, Text, Thumbnail, View} from 'native-base';
import {onOrderComplete} from '../helpers/firestore';
import {showAlertBackButton} from '../helpers/alerts';
import OrderContext from '../context/order/orderContext';
import globalStyles from '../styles/global';

// Assets
const img = {src: require('../assets/wait.gif')};
const img2 = {src: require('../assets/clock.gif')};
const img3 = {src: require('../assets/ok.gif')};

export const Progress = () => {
  // Hooks
  const {idRequest, resetOrder} = useContext(OrderContext);
  const [timer, setTimer] = useState(0);
  const [isComplete, saveIsComplete] = useState(false);
  const [currentDate, setCurrentDate] = useState(Date.now());
  const navigation = useNavigation();

  useEffect(() => {
    onOrderComplete(idRequest, ({newTimer, complete, create}) => {
      setTimer(newTimer);
      saveIsComplete(complete);
      setCurrentDate(create);
    });
  }, []);

  useEffect(() => {
    const backHandler = showAlertBackButton(
      'Atención!',
      'Estamos preparando su pedido no puede realizar mas acciones',
    );
    return () => backHandler.remove();
  }, []);

  // Funciones
  const render = ({hours, minutes, seconds}) => (
    <Text style={styles.timer}>
      {hours}:{minutes}:{seconds}
    </Text>
  );

  const finishOrder = async () => {
    resetOrder();
    navigation.navigate('NewOrder');
  };

  return (
    <Container style={globalStyles.container}>
      <View
        style={[
          globalStyles.content,
          globalStyles.centerContent,
          {marginTop: 50},
        ]}>
        {timer === 0 && (
          <>
            <Text style={[globalStyles.textCenter, globalStyles.textGray]}>
              Hemos recibido su pedido
            </Text>
            <Text style={[globalStyles.textCenter, globalStyles.textGray]}>
              Estamos calculando el tiempo de entrega, gracias por esperar.
            </Text>
            <Thumbnail style={globalStyles.image} source={img.src} />
          </>
        )}

        {!isComplete && timer > 0 && (
          <>
            <Text style={[globalStyles.textCenter, globalStyles.textGray]}>
              Su pedido estará listo en:
            </Text>
            <Countdown
              date={currentDate + timer * 60000}
              renderer={render}></Countdown>
            <Text
              style={[
                globalStyles.textCenter,
                globalStyles.textGray,
                {marginBottom: 20},
              ]}>
              Le informaremos cuando puede pasar por su pedido
            </Text>
            <Thumbnail style={globalStyles.image} source={img2.src} />
          </>
        )}

        {isComplete && (
          <>
            <H1 style={[globalStyles.textCenter, globalStyles.textGray]}>
              Pedido terminado
            </H1>
            <H3 style={[globalStyles.textCenter, globalStyles.textGray]}>
              Por favor, pase a recoger su pedido
            </H3>
            <Thumbnail style={globalStyles.image} source={img3.src} />
            <Button
              block
              style={[globalStyles.button, {marginTop: 50}]}
              onPress={finishOrder}>
              <Text>Comenzar una nueva orden</Text>
            </Button>
          </>
        )}
      </View>
    </Container>
  );
};

// Estilos del componente
const styles = StyleSheet.create({
  timer: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 60,
    marginTop: 30,
  },
});
