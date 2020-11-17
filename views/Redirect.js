import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {Icon} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import OrderContext from '../context/order/orderContext';

const Redirect = ({typeRedirect}) => {
  // Hooks
  const navigate = useNavigation();
  const {totalPay} = useContext(OrderContext);

  return (
    <>
      {totalPay > 0 && typeRedirect === 'summary' ? (
        <Icon
          onPress={() => navigate.navigate('Summary')}
          name="log-out-outline"
          style={{
            fontSize: 30,
            marginRight: 12,
            color: 'white',
          }}
        />
      ) : (
        typeRedirect === 'myShopping' && (
          <Icon
            onPress={() => navigate.navigate('MyBuys')}
            name="fast-food-outline"
            style={{
              fontSize: 30,
              marginRight: 12,
              color: 'white',
            }}
          />
        )
      )}
    </>
  );
};

Redirect.propTypes = {
  typeRedirect: PropTypes.string.isRequired,
};

export default Redirect;
