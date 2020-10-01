import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Container, Button, Text} from 'native-base';
import globalStyles from '../styles/global';
import {useNavigation} from '@react-navigation/native';

export const NewOrder = () => {
  const navigation = useNavigation();

  return (
    <>
      <Container style={globalStyles.container}>
        <View style={[globalStyles.content, styles.centerContent]}>
          <Button info block onPress={() => navigation.navigate('Menu')}>
            <Text style={globalStyles.uppercase}>Crear nueva orden</Text>
          </Button>
        </View>
      </Container>
    </>
  );
};

const styles = StyleSheet.create({
  centerContent: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
});
