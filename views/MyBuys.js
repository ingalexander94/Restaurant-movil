import React, {useContext, useEffect, useRef, useState} from 'react';
import {StyleSheet} from 'react-native';
import {
  Body,
  Button,
  Card,
  CardItem,
  Container,
  Content,
  Icon,
  List,
  ListItem,
  Right,
  Separator,
  Text,
  View,
} from 'native-base';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import FirebaseContext from '../context/firebase/firebaseContext';
import globalStyles from '../styles/global';
import {formatOrders} from '../helpers/firestore';
import {
  comparateDates,
  showFormatDate,
  showFormatMonth,
} from '../helpers/pipes';
import {useNavigation} from '@react-navigation/native';

const initState = `Sus compras Hasta hoy ${showFormatMonth()}`;

export const MyBuys = () => {
  // Hooks
  const {orders} = useContext(FirebaseContext);
  const ref = useRef({});
  const navigation = useNavigation();
  const [buys, setBuys] = useState({});
  const [textDate, setTextDate] = useState(initState);
  useEffect(() => {
    ref.current = formatOrders(orders);
    setBuys(formatOrders(orders));
  }, []);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  // Funciones
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const showAll = () => {
    setBuys(ref.current);
    setTextDate(initState);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setTextDate(`Compras del ${showFormatDate(date)}`);
    const data = ref.current.data.filter((saucer) =>
      comparateDates(new Date(saucer.create), date),
    );
    const total = data.reduce((acc, curr) => curr.price + acc, 0);
    setBuys({data, total});
    hideDatePicker();
  };

  return (
    <>
      <Container style={globalStyles.container}>
        <Content style={globalStyles.content}>
          <View>
            <View style={styles.buttonsFilter}>
              <Button
                bordered
                style={globalStyles.buttonOutline}
                onPress={showAll}>
                <Text style={globalStyles.buttonOutlineText}>Ver todos</Text>
              </Button>
              <Button
                bordered
                style={globalStyles.buttonOutline}
                onPress={showDatePicker}>
                <Text style={globalStyles.buttonOutlineText}>
                  Filtrar fecha
                </Text>
              </Button>
            </View>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              locale="es_ES"
              maximumDate={new Date()}
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
          </View>
          <Separator style={styles.separator}>
            <Text
              style={[
                globalStyles.uppercase,
                globalStyles.textCenter,
                styles.separatorText,
              ]}>
              {textDate}
            </Text>
          </Separator>
          <Card>
            <CardItem style={styles.card}>
              <Body>
                <Text style={styles.textCard}>
                  En total se gastó ${buys.total} COP llevando{' '}
                  {buys.data?.length} platillos de Food.
                </Text>
              </Body>
            </CardItem>
          </Card>
          <Text style={[globalStyles.textCenter, globalStyles.m2]}>
            Ha realizado {orders.length} compras desde que está en Food.
          </Text>
          <List>
            {buys.data?.length > 0 ? (
              buys.data.map((buy) => (
                <ListItem key={buy.id}>
                  <Body>
                    <Text style={globalStyles.uppercase}>
                      {buy.name}{' '}
                      <Text note style={styles.colorQuantity}>
                        x{buy.quantity}
                      </Text>
                    </Text>
                    <Text note numberOfLines={2}>
                      {buy.description}
                    </Text>
                    <Text note> {showFormatDate(new Date(buy.create))} </Text>
                  </Body>
                  <Right>
                    <Text note>${buy.price}</Text>
                  </Right>
                </ListItem>
              ))
            ) : (
              <>
                <Text style={[globalStyles.textCenter, globalStyles.m2]}>
                  No se encontrarón registro de compras
                </Text>
                <Button
                  style={globalStyles.button}
                  block
                  onPress={() => navigation.navigate('Menu')}>
                  <Text style={globalStyles.uppercase}>Empezar a pedir</Text>
                  <Icon name="arrow-forward-outline"></Icon>
                </Button>
              </>
            )}
          </List>
        </Content>
      </Container>
    </>
  );
};

// Estilos del componente
const styles = StyleSheet.create({
  separator: {
    backgroundColor: '#EEEEEE',
    marginTop: 10,
  },
  separatorText: {
    color: '#616B76',
    fontSize: 15,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  colorQuantity: {
    color: '#FF9709',
  },
  card: {
    backgroundColor: '#FFBA5C',
  },
  textCard: {
    fontWeight: 'bold',
    color: 'white',
  },
  buttonsFilter: {
    marginVertical: 15,
    flexDirection: 'row',
    flex: 1,
    left: 0,
    right: 0,
    justifyContent: 'space-between',
  },
});
