import {Alert, BackHandler} from 'react-native';

const confirmationAlert = (title = '', message = '', onPress) => {
  Alert.alert(title, message, [
    {
      text: 'Cancelar',
      style: 'cancel',
    },
    {
      text: 'Confirmar',
      onPress: () => onPress(),
    },
  ]);
};

const showAlert = (title, message) => Alert.alert(title, message);

const showAlertBackButton = (title = '', message = '') => {
  const backAction = () => showAlertInfo(title, message);
  const backHandler = BackHandler.addEventListener(
    'hardwareBackPress',
    backAction,
  );
  return backHandler;
};

const showAlertInfo = (title = '', message = '') => {
  Alert.alert(title, message, [{text: 'Aceptar', onPress: () => null}]);
  return true;
};

export {confirmationAlert, showAlert, showAlertBackButton};
