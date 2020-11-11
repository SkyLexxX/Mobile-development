import React from 'react'
import {Alert, StyleSheet, View, KeyboardAvoidingView} from 'react-native'
import FormButton from "../components/FormButton/FormButton";
import * as Yup from 'yup';
import {Formik} from 'formik';
import firebase from "../api/firebase/firebase";
import FormInput from "../components/FormInput/FormInput";


const LoginTest = (props) => {

    const shema = Yup.object({
        email: Yup.string().email('Email is invalid').required('Email is required'),
        password: Yup
            .string()
            .required('Password is required')
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                `8 Characters\nOne Uppercase\nOne Lowercase\nOne Number\nOne special case Character`)

    });

    const submit = (values) => {
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
    };

    const goToSignup = () => props.navigation.navigate('Signup');

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior="padding"
        >
            <View style={styles.container}>
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
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
});

export default LoginTest