import React, {useContext, Fragment, useEffect} from 'react';
import {StyleSheet, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  Container,
  Text,
  Content,
  Separator,
  List,
  ListItem,
  Body,
  Right,
  Left,
} from 'native-base';
import FirebaseContext from '../context/firebase/firebaseContext';
import OrderContext from '../context/order/orderContext';
import globalStyles from '../styles/global';

export const Menu = () => {
  // Hooks
  const {menu, listenProducts} = useContext(FirebaseContext);
  const {selectSaucer} = useContext(OrderContext);
  const navigate = useNavigation();

  useEffect(() => {
    async function load() {
      await listenProducts();
    }

    load();
  }, []);

  // Funciones
  const showHeading = (category, i) => {
    let previousCagetory = i > 0 ? menu[i - 1].category : 0;
    if (previousCagetory !== category) {
      return (
        <Separator style={styles.separator}>
          <Text style={[globalStyles.uppercase, styles.separatorText]}>
            {category}
          </Text>
        </Separator>
      );
    }
  };

  const select = (saucer) => {
    selectSaucer(saucer);
    navigate.navigate('DetailProduct');
  };

  return (
    <>
      <Container style={globalStyles.container}>
        <Content style={globalStyles.content}>
          <List>
            {menu.map((saucer, i) => {
              const {image, name, description, category, price, id} = saucer;
              return (
                <Fragment key={id}>
                  {showHeading(category, i)}
                  <ListItem avatar onPress={() => select(saucer)}>
                    <Left>
                      <Image
                        style={globalStyles.imageProduct}
                        source={{uri: image}}
                      />
                    </Left>
                    <Body>
                      <Text style={globalStyles.uppercase}>{name}</Text>
                      <Text note numberOfLines={1}>
                        {description}
                      </Text>
                    </Body>
                    <Right>
                      <Text note>${price}</Text>
                    </Right>
                  </ListItem>
                </Fragment>
              );
            })}
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
  card: {
    backgroundColor: 'white',
    padding: 10,
    marginLeft: 10,
    borderRadius: 20,
  },
  cardtitle: {
    fontWeight: 'bold',
    color: 'black',
  },
});
