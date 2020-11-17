import React, {useContext, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
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
import {createClient} from '../../helpers/firestore';
import UIContext from '../../context/ui/uiContext';
import globalStyles from '../../styles/global';
import authStyles from '../../styles/auth';

export const Register = () => {
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
              name: '',
              email: '',
              password: '',
            }}
            onSubmit={(user) => {
              startLoading();
              createClient(user, (res) => {
                finishLoading();
                !res.ok && showAlert('Ocurrio un error', res.message);
              });
            }}
            validationSchema={Yup.object({
              name: Yup.string()
                .min(3, 'Debe tener al menos 3 caracteres')
                .required('El campo nombre es obligatorio'),
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
                      name="person-outline"></Icon>
                    <Input
                      style={authStyles.inputAuth}
                      placeholder="Nombre"
                      textContentType="name"
                      onChangeText={handleChange('name')}
                      onBlur={handleBlur('name')}
                      value={values.name}
                      placeholderTextColor="gray"
                    />
                  </Item>
                  {errors.name && (
                    <Text style={authStyles.textError}>{errors.name}</Text>
                  )}
                </Content>
                <Content style={authStyles.itemAuth}>
                  <Item regular rounded style={authStyles.itemInput}>
                    <Icon
                      style={authStyles.inputAuth}
                      active
                      name="mail-outline"></Icon>
                    <Input
                      style={authStyles.inputAuth}
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
                      style={authStyles.inputAuth}
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
                  style={authStyles.buttonAuth}
                  onPress={handleSubmit}>
                  <Text>Crear cuenta</Text>
                  {loading && <Spinner color="white" />}
                </Button>
                <Text
                  style={authStyles.linkAuth}
                  onPress={() => navigation.navigate('Login')}>
                  Ir a Iniciar Sesión
                </Text>
              </>
            )}
          </Formik>
        </Content>
      </Container>
    </>
  );
};
