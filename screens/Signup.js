import React from 'react'
import {StyleSheet, View, Alert, KeyboardAvoidingView,} from 'react-native'
import {Formik} from "formik";
import * as Yup from "yup";

import firebase from '../api/firebase/firebase'
import FormButton from "../components/FormButton/FormButton";
import FormInput from "../components/FormInput/FormInput";

const SignupTest = (props) => {

    const shema = Yup.object({
        name: Yup
            .string()
            .min(1, 'Name needs to be at least 1 char')
            .max(20, 'Name cannot exceed 20 char')
            .required('Name is required'),
        phone: Yup
            .string()
            .required('Phone number is required')
            .matches(/^\d{10}$/, 'Phone number must be 10 digits'),
        email: Yup.string().email('Email is invalid').required('Email is required'),
        password: Yup
            .string()
            .required('Password is required')
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, `error`)

    });

    const onSignup = (values) => {
        firebase
            .auth()
            .createUserWithEmailAndPassword(values.email, values.password)
            .then((res) => {
                res.user.updateProfile({
                    displayName: values.name,
                    phoneNumber: values.phone
                });
                console.log('User registered successfully!');
                firebase
                    .auth()
                    .signInWithEmailAndPassword(values.email, values.password)
                    .then((res) => {
                        console.log(res);
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
                    });
            })
            .catch(error =>
                Alert.alert(
                    "Error",
                    `${error}`,
                    [
                        {text: "OK", onPress: () => props.navigation.navigate('Auth')}
                    ],
                    {cancelable: true}
                )
            )
    };

    const goToLogin = () => props.navigation.navigate('Login');

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior="padding"
        >
            <View style={styles.container}>
                <Formik
                    initialValues={{name: '', phone: '', email: '', password: ''}}
                    validationSchema={shema}
                    onSubmit={values => {
                        onSignup(values)
                    }}
                >
                    {({errors, touched, handleChange, handleBlur, handleSubmit, values}) => (
                        <View>
                            <FormInput
                                title={'name'}
                                handler={handleChange('name')}
                                blurHandler={handleBlur('name')}
                                placeholder={"Enter name"}
                                value={values.name}
                                touched={touched.name}
                                errors={errors.name}
                            />
                            <FormInput
                                title={'phone'}
                                handler={handleChange('phone')}
                                blurHandler={handleBlur('phone')}
                                placeholder={"Enter phone"}
                                value={values.phone}
                                touched={touched.phone}
                                errors={errors.phone}
                                keyboardType='numeric'
                            />
                            <FormInput
                                title={'email'}
                                handler={handleChange('email')}
                                blurHandler={handleBlur('email')}
                                placeholder={"Enter email"}
                                value={values.email}
                                touched={touched.email}
                                errors={errors.email}
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
                            />
                            <FormButton title="Sign Up" click={(values) => handleSubmit(values)}/>
                        </View>
                    )}
                </Formik>
                <FormButton title='Go to Login' click={goToLogin}/>
            </View>
        </KeyboardAvoidingView>
    )
};

const styles = StyleSheet.create({
    star: {
        color: 'red',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    error: {
        color: 'red',
        marginBottom: 20
    },
});

export default SignupTest