import {useNavigation} from '@react-navigation/native';
import React, {useContext, useState} from 'react';
import {
  Button,
  Container,
  Content,
  Icon,
  Input,
  Item,
  Spinner,
  Text,
} from 'native-base';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {showAlert} from '../../helpers/alerts';
import UIContext from '../../context/ui/uiContext';
import {login} from '../../helpers/firestore';
import globalStyles from '../../styles/global';
import authStyles from '../../styles/auth';

export const Login = () => {
  // Hooks
  const navigation = useNavigation();
  const [iconLook, setIconLook] = useState({
    icon: 'eye-off',
    password: true,
  });
  const {loading, startLoading, finishLoading} = useContext(UIContext);

  // Funciones
  const changeIconLook = () => {
    if (iconLook.icon === 'eye-off') {
      setIconLook({
        icon: 'eye-outline',
        password: false,
      });
    } else {
      setIconLook({
        icon: 'eye-off',
        password: true,
      });
    }
  };

  return (
    <>
      <Container style={globalStyles.container}>
        <Content style={globalStyles.content}>
          <Text style={authStyles.titleAuth}>
            Fo<Text style={authStyles.subtitleAuth}>od</Text>
            <Icon style={authStyles.iconTitle} name="fast-food-outline"></Icon>
          </Text>
          <Formik
            initialValues={{
              email: 'prueba@gmail.com',
              password: '123456',
            }}
            onSubmit={(user) => {
              startLoading();
              login(user, (res) => {
                finishLoading();
                !res.ok && showAlert('Ocurrio un error', res.message);
              });
            }}
            validationSchema={Yup.object({
              email: Yup.string()
                .email('El correo no es válido')
                .required('El campo correo es obligatorio'),
              password: Yup.string()
                .min(6, 'Debe tener al menos 6 caracteres')
                .required('El campo contraseña es obligatorio'),
            })}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              isValid,
            }) => (
              <>
                <Content style={authStyles.itemAuth}>
                  <Item regular rounded style={authStyles.itemInput}>
                    <Icon
                      style={authStyles.inputAuth}
                      active
                      name="mail-outline"></Icon>
                    <Input
                      style={globalStyles.input}
                      textContentType="emailAddress"
                      keyboardType="email-address"
                      placeholder="Correo"
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      value={values.email}
                      placeholderTextColor="gray"
                    />
                  </Item>
                  {errors.email && (
                    <Text style={authStyles.textError}>{errors.email}</Text>
                  )}
                </Content>
                <Content style={authStyles.itemAuth}>
                  <Item regular rounded style={authStyles.itemInput}>
                    <Icon
                      style={authStyles.inputAuth}
                      active
                      name="key-outline"></Icon>
                    <Input
                      style={globalStyles.input}
                      secureTextEntry={iconLook.password}
                      placeholder="Contraseña"
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={values.password}
                      placeholderTextColor="gray"
                    />
                    <Icon onPress={changeIconLook} name={iconLook.icon}></Icon>
                  </Item>
                  {errors.password && (
                    <Text style={authStyles.textError}>{errors.password}</Text>
                  )}
                </Content>

                <Button
                  disabled={!isValid}
                  block
                  onPress={handleSubmit}
                  style={authStyles.buttonAuth}>
                  <Text>Entrar</Text>
                  {loading && <Spinner color="white" />}
                </Button>
                <Text
                  style={authStyles.linkAuth}
                  onPress={() => navigation.navigate('Register')}>
                  Ir a Crear una cuenta
                </Text>
              </>
            )}
          </Formik>
        </Content>
      </Container>
    </>
  );
};
