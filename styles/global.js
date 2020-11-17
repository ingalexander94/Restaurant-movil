import {StyleSheet} from 'react-native';

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  input: {
    backgroundColor: '#EEEEEE',
  },
  containerPrivate: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    marginHorizontal: '2.5%',
    flex: 1,
  },
  centerContent: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  uppercase: {
    textTransform: 'uppercase',
  },
  textWhite: {
    color: 'white',
  },
  textBlack: {
    color: '#616B76',
  },
  textGray: {
    color: 'gray',
  },
  textCenter: {
    textAlign: 'center',
  },
  m2: {
    marginTop: 10,
  },
  title: {
    textAlign: 'center',
    textTransform: 'uppercase',
    color: 'black',
    marginTop: 40,
    marginBottom: 20,
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'Cochin',
  },
  subtitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 30,
    color: '#FFBA5C',
    textTransform: 'uppercase',
  },
  image: {
    height: 300,
    width: '100%',
    resizeMode: 'contain',
  },
  imageProduct: {
    height: 50,
    width: 50,
  },
  imageLoading: {
    height: 400,
    width: '100%',
  },
  button: {
    backgroundColor: '#FFBA5C',
    marginTop: 10,
  },
  buttonOutline: {
    backgroundColor: 'white',
    borderColor: '#FFBA5C',
    marginTop: 20,
  },
  buttonOutlineText: {
    color: '#FFBA5C',
  },
  buttonNav: {
    backgroundColor: '#FFBA5C',
  },
  buttonTextNav: {
    color: 'white',
    fontSize: 15,
  },
  price: {
    fontWeight: 'bold',
  },
});

export default globalStyles;
