import React, {useState, useCallback} from 'react';
import {Alert, StyleSheet, View, KeyboardAvoidingView} from 'react-native'
import { Appearance } from 'react-native-appearance';
import * as Yup from 'yup';
import {Formik} from 'formik';

import FormButton from "../components/FormButton/FormButton";
import firebase from "../api/firebase/firebase";
import FormInput from "../components/FormInput/FormInput";

const LoginTest = (props) => {

    const [color, setColor] = useState(Appearance.getColorScheme());

    const shema = Yup.object({
        email: Yup.string().email('Email is invalid').required('Email is required'),
        password: Yup
            .string()
            .required('Password is required')
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                `8 Characters\nOne Uppercase\nOne Lowercase\nOne Number\nOne special case Character`)

    });

    const submit = useCallback((values) => {
        firebase
            .auth()
            .signInWithEmailAndPassword(values.email, values.password)
            .then((res) => {
                console.log(res);
                console.log('User logged-in successfully!');
                props.navigation.navigate('App')
            })
            .catch(error => {
                Alert.alert(
                    "Error",
                    `${error}`,
                    [
                        {text: "OK", onPress: () => props.navigation.navigate('Auth')}
                    ],
                    {cancelable: true}
                );
            })
    });

    const goToSignup = useCallback(() => props.navigation.navigate('Signup'));

    return (
        <KeyboardAvoidingView
            style={color === 'dark' ? styles.containerBlack : styles.container}
            behavior="padding"
        >
            <View style={color === 'dark' ? styles.containerBlack : styles.container}>
                <Formik
                    initialValues={{email: '', password: ''}}
                    validationSchema={shema}
                    onSubmit={values => {
                        submit(values)
                    }}
                >
                    {({errors, touched, handleChange, handleBlur, handleSubmit, values}) => (
                        <View>
                            <FormInput
                                title={'email'}
                                handler={handleChange('email')}
                                blurHandler={handleBlur('email')}
                                placeholder={"Enter email"}
                                value={values.email}
                                touched={touched.email}
                                errors={errors.email}
                                theme={color}
                            />
                            <FormInput
                                title={'password'}
                                handler={handleChange('password')}
                                blurHandler={handleBlur('password')}
                                placeholder={"Enter password"}
                                value={values.password}
                                touched={touched.password}
                                errors={errors.password}
                                checkboxValue={values}
                                secureTextEntry={true}
                                theme={color}
                            />
                            <FormButton modeValue='text' title='Login' click={(values) => handleSubmit(values)}/>
                        </View>
                    )}
                </Formik>
                <FormButton modeValue='text' title='Go to Signup' click={goToSignup}/>
            </View>
        </KeyboardAvoidingView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
        // padding: 35,
        backgroundColor: 'white',
        color: 'black'
    },
    containerBlack: {
        flex: 1,
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
        // padding: 35,
        backgroundColor: 'black',
        color: 'white'
    },
});

export default LoginTest