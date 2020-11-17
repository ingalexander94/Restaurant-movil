import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import lodash from 'lodash';

// Autenticación
const createClient = async ({name, email, password}, callback) => {
  try {
    const {user} = await auth().createUserWithEmailAndPassword(email, password);
    await user.updateProfile({
      displayName: name,
    });
    callback({
      ok: true,
      uid: user.uid,
    });
  } catch (error) {
    callback({
      ok: false,
      message: error.message,
    });
  }
};

const login = async ({email, password}, callback) => {
  try {
    const {user} = await auth().signInWithEmailAndPassword(email, password);
    callback({
      ok: true,
      uid: user.uid,
    });
  } catch (error) {
    callback({
      ok: false,
      message: error.message,
    });
  }
};

const logout = async () => {
  try {
    await auth().signOut();
  } catch (error) {
    console.log(error);
  }
};

// Ordenes y Productos
const onLoadProductsFirestore = async (callback) => {
  await firestore()
    .collection('products')
    .where('exists', '==', true)
    .onSnapshot(handleOnSnapshot);

  function handleOnSnapshot(snapshot) {
    if (snapshot) {
      let res = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      res = lodash.sortBy(res, 'category');

      callback(res);
    }
  }
};

const onMyOrdersFirestore = async (idClient, callback) => {
  await firestore()
    .collection('orders')
    .where('uidClient', '==', idClient)
    .onSnapshot(handleOnSnapshot);
  function handleOnSnapshot(snapshot) {
    if (snapshot) {
      let res = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      callback(res);
    }
  }
};

const onOrderComplete = async (id, callback) => {
  await firestore().collection('orders').doc(id).onSnapshot(handleOnSnapshot);

  function handleOnSnapshot(doc) {
    if (doc) {
      const {timer, complete, create} = doc.data();
      callback({newTimer: timer, complete, create});
    }
  }
};

const sendOrder = async (order) => {
  try {
    const {id} = await firestore().collection('orders').add(order);
    return id;
  } catch (error) {
    console.error(error);
  }
};

const hasOrder = (orders = []) => {
  for (const i in orders) {
    if (!orders[i].complete) {
      return orders[i];
    }
  }
  return null;
};

// Compras
const formatOrders = (orders = []) => {
  let ordersComplete = orders.filter((order) => order.complete);
  const total = ordersComplete.reduce((acc, curr) => curr.total + acc, 0);
  let myOrders = ordersComplete.map((order) => ({
    products: order.order.map(({id, description, name, price, quantity}) => ({
      create: order.create,
      id,
      description,
      name,
      price,
      quantity,
    })),
  }));

  let data = myOrders.reduce((acc, curr) => acc.concat(curr.products), []);

  return {total, data};
};

export {
  onLoadProductsFirestore,
  sendOrder,
  onMyOrdersFirestore,
  onOrderComplete,
  createClient,
  hasOrder,
  formatOrders,
  logout,
  login,
};
