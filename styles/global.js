import {StyleSheet} from 'react-native';

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#343a40',
  },
  content: {
    marginHorizontal: '2.5%',
    flex: 1,
  },
  uppercase: {
    textTransform: 'uppercase',
  },
  textWhite: {
    color: 'white',
  },
  title: {
    textAlign: 'center',
    textTransform: 'uppercase',
    color: 'white',
    marginTop: 40,
    marginBottom: 20,
    fontSize: 30,
  },
  image: {
    height: 300,
    width: '100%',
  },
  price: {
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default globalStyles;
