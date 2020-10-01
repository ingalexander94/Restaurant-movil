import {useNavigation} from '@react-navigation/native';
import {Icon} from 'native-base';
import React, {useContext} from 'react';
import OrderContext from '../context/order/orderContext';

export const Redirect = () => {
  const navigate = useNavigation();
  const {totalPay} = useContext(OrderContext);

  return (
    <>
      {totalPay > 0 && (
        <Icon
          onPress={() => navigate.navigate('Summary')}
          name="log-out-outline"
          style={{
            fontSize: 30,
            color: '#17a2b8',
            marginRight: 12,
          }}
        />
      )}
    </>
  );
};
