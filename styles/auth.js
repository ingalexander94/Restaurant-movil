import {StyleSheet} from 'react-native';

const authStyles = StyleSheet.create({
  titleAuth: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 40,
    marginTop: 60,
    marginBottom: 60,
  },
  subtitleAuth: {
    color: '#FFBA5C',
    fontSize: 40,
  },
  iconTitle: {
    fontSize: 60,
  },
  buttonAuth: {
    backgroundColor: '#FFBA5C',
    marginTop: 20,
  },
  itemAuth: {
    marginTop: 10,
    marginBottom: 20,
  },
  itemInput: {
    borderColor: 'white',
    backgroundColor: '#EEEEEE',
  },
  inputAuth: {
    color: 'black',
  },
  linkAuth: {
    textAlign: 'center',
    color: '#757575',
    marginTop: 30,
    textTransform: 'uppercase',
  },
  textError: {
    color: '#FF6961',
    textAlign: 'left',
    marginLeft: 10,
  },
});

export default authStyles;
