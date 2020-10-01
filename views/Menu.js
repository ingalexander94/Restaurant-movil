import React, {useContext, useEffect, Fragment} from 'react';
import {StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  Container,
  Text,
  Content,
  Separator,
  List,
  ListItem,
  Thumbnail,
  Body,
} from 'native-base';
import FirebaseContext from '../context/firebase/firebaseContext';
import OrderContext from '../context/order/orderContext';
import globalStyles from '../styles/global';

export const Menu = () => {
  const {menu, listenProducts} = useContext(FirebaseContext);
  const {selectSaucer} = useContext(OrderContext);
  const navigate = useNavigation();

  useEffect(() => {
    listenProducts();
  }, []);

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
                  <ListItem onPress={() => select(saucer)}>
                    <Thumbnail large square source={{uri: image}} />
                    <Body>
                      <Text
                        style={[
                          globalStyles.uppercase,
                          {fontWeight: 'bold', color: '#17a2b8'},
                        ]}>
                        {name}
                      </Text>
                      <Text
                        note
                        numberOfLines={2}
                        style={globalStyles.textWhite}>
                        {description}
                      </Text>
                      <Text style={globalStyles.textWhite}>
                        Precio: ${price}
                      </Text>
                    </Body>
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

const styles = StyleSheet.create({
  separator: {
    backgroundColor: '#17a2b8',
  },
  separatorText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
