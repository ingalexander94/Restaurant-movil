import AsyncStorage from '@react-native-community/async-storage';

const setLocalStorage = async (name = '', element = Date.now().toString()) => {
  try {
    await AsyncStorage.setItem(name, element);
  } catch (error) {
    console.error(error);
  }
};

const getLocalStorage = async (name = '') => {
  try {
    const value = await AsyncStorage.getItem(name);
    if (value !== null) {
      return value;
    }
    return '';
  } catch (error) {
    console.error(error);
  }
};

const deleteLocalStorage = async (name) => await AsyncStorage.removeItem(name);

export {setLocalStorage, getLocalStorage, deleteLocalStorage};
