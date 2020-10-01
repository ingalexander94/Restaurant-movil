import firestore from '@react-native-firebase/firestore';
import lodash from 'lodash';

const onLoadProductsFirestore = async (callback) => {
  await firestore()
    .collection('products')
    .where('exists', '==', true)
    .onSnapshot(handleOnSnapshot);

  function handleOnSnapshot(snapshot) {
    let res = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });

    res = lodash.sortBy(res, 'category');

    callback(res);
  }
};

const onOrderComplete = async (id, callback) => {
  await firestore().collection('orders').doc(id).onSnapshot(handleOnSnapshot);

  function handleOnSnapshot(doc) {
    const {timer, complete} = doc.data();
    callback({newTimer: timer, complete});
  }
};

const sendOrder = async (order) => {
  try {
    const {id} = await firestore().collection('orders').add(order);
    return id;
  } catch (error) {
    console.log(error);
  }
};

export {onLoadProductsFirestore, sendOrder, onOrderComplete};
