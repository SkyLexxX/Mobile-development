import React, {useEffect, useState, useCallback} from 'react';
import {StyleSheet, SafeAreaView, ScrollView, Keyboard, View, TouchableWithoutFeedback} from 'react-native';
import {Formik} from "formik";
import * as Yup from "yup";
import axios from 'axios';

import FormInput from "../components/FormInput/FormInput";
import FormButton from "../components/FormButton/FormButton";
import firebase from "../api/firebase/firebase";
import {DARK_NEUTRAL, DARK_PRIMARY, DARK_SECONDARY, HIGHLIGHT, LIGHT_PRIMARY, LIGHT_SECONDARY} from "../colors";


const AddStation = (props) => {
    const [uid, setUid] = useState(firebase.auth().currentUser.uid);
    const [isEnabled, setIsEnabled] = useState(false);

    const shema = Yup.object({
        name: Yup.string().required('Name is required'),
        description: Yup.string().required('Description is required'),
        temperature: Yup.string().required('Temperature is required'),
        humidity: Yup.string().required('Humidity is required'),
        windSpeed: Yup.string().required('Wind-speed is required'),
        direction: Yup.string().required('Direction is required'),
        pressure: Yup.string().required('Pressure is required'),
        location: Yup.string().required('Location is required'),
        dateOfInstallation: Yup.string().required('Date is required'),
        dateOfServiceWork: Yup.string().required('Date is required'),
        producer_id: Yup.string().required('Producer-id is required'),
    });

    const submit = useCallback((values) => {
        axios.post(`http://weatherapp.eba-7cfnuwsm.eu-west-1.elasticbeanstalk.com/api/stations/`, {
            "station": {
                name: values.name,
                description: values.description,
                temperature: values.temperature,
                humidity: parseInt(values.humidity, 10),
                wind_speed: parseInt(values.windSpeed, 10),
                direction: values.direction,
                pressure: values.pressure,
                location: values.location,
                date_of_installation: values.dateOfInstallation,
                date_of_service_work: values.dateOfServiceWork,
                producer_id: parseInt(values.producer_id, 10),
            }
        })
            .then(function (response) {
                console.log(response);
                props.navigation.navigate('Cloud')
            })
            .catch(function (error) {
                console.log(error);
                alert(`Oops something went wrong,\n${error}`);
            });
    });

    useEffect(() => {
        firebase
            .firestore()
            .collection('users')
            .doc(uid)
            .onSnapshot(function (doc) {
                {
                    doc.data() && doc.data().theme ? setIsEnabled(true) : setIsEnabled(false)
                }
                console.log("Current data: ", doc.data());
            });
    }, [uid]);

    useEffect(() => {
        props.navigation.setParams({
            isDarkMode: isEnabled
        });
    }, [isEnabled]);

    return (
        <SafeAreaView style={[styles.container, {backgroundColor: isEnabled ? DARK_SECONDARY : LIGHT_SECONDARY}]}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <SafeAreaView style={styles.safeAreaContainer}>
                    <ScrollView
                        style={{flex: 1, width: '100%'}}
                        contentContainerStyle={{flexGrow: 1}}
                        scrollEnabled={true}
                    >
                        <View style={styles.formConteiner}>
                            <Formik
                                initialValues={{
                                    name: '',
                                    description: '',
                                    temperature: '',
                                    humidity: '',
                                    windSpeed: '',
                                    direction: '',
                                    pressure: '',
                                    location: '',
                                    dateOfInstallation: '',
                                    dateOfServiceWork: '',
                                    producer_id: '',
                                }}
                                validationSchema={shema}
                                onSubmit={values => {
                                    submit(values)
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
                                            theme={isEnabled && 'dark'}
                                        />
                                        <FormInput
                                            title={'description'}
                                            handler={handleChange('description')}
                                            blurHandler={handleBlur('description')}
                                            placeholder={"Enter description"}
                                            value={values.description}
                                            touched={touched.description}
                                            errors={errors.description}
                                            theme={isEnabled && 'dark'}
                                        />
                                        <FormInput
                                            title={'temperature'}
                                            handler={handleChange('temperature')}
                                            blurHandler={handleBlur('temperature')}
                                            placeholder={"Enter temperature"}
                                            value={values.temperature}
                                            touched={touched.temperature}
                                            errors={errors.temperature}
                                            theme={isEnabled && 'dark'}
                                        />
                                        <FormInput
                                            title={'humidity'}
                                            handler={handleChange('humidity')}
                                            blurHandler={handleBlur('humidity')}
                                            placeholder={"Enter humidity"}
                                            value={values.humidity}
                                            touched={touched.humidity}
                                            errors={errors.humidity}
                                            theme={isEnabled && 'dark'}
                                        />
                                        <FormInput
                                            title={'windSpeed'}
                                            handler={handleChange('windSpeed')}
                                            blurHandler={handleBlur('windSpeed')}
                                            placeholder={"Enter wind-speed"}
                                            value={values.windSpeed}
                                            touched={touched.windSpeed}
                                            errors={errors.windSpeed}
                                            theme={isEnabled && 'dark'}
                                        />
                                        <FormInput
                                            title={'direction'}
                                            handler={handleChange('direction')}
                                            blurHandler={handleBlur('direction')}
                                            placeholder={"Enter direction"}
                                            value={values.direction}
                                            touched={touched.direction}
                                            errors={errors.direction}
                                            theme={isEnabled && 'dark'}
                                        />
                                        <FormInput
                                            title={'pressure'}
                                            handler={handleChange('pressure')}
                                            blurHandler={handleBlur('pressure')}
                                            placeholder={"Enter pressure"}
                                            value={values.pressure}
                                            touched={touched.pressure}
                                            errors={errors.pressure}
                                            theme={isEnabled && 'dark'}
                                        />
                                        <FormInput
                                            title={'location'}
                                            handler={handleChange('location')}
                                            blurHandler={handleBlur('location')}
                                            placeholder={"Enter location"}
                                            value={values.location}
                                            touched={touched.location}
                                            errors={errors.location}
                                            theme={isEnabled && 'dark'}
                                        />
                                        <FormInput
                                            title={'Installation'}
                                            handler={handleChange('dateOfInstallation')}
                                            blurHandler={handleBlur('dateOfInstallation')}
                                            placeholder={"Enter date"}
                                            value={values.dateOfInstallation}
                                            touched={touched.dateOfInstallation}
                                            errors={errors.dateOfInstallation}
                                            theme={isEnabled && 'dark'}
                                        />
                                        <FormInput
                                            title={'Service'}
                                            handler={handleChange('dateOfServiceWork')}
                                            blurHandler={handleBlur('dateOfServiceWork')}
                                            placeholder={"Enter date"}
                                            value={values.dateOfServiceWork}
                                            touched={touched.dateOfServiceWork}
                                            errors={errors.dateOfServiceWork}
                                            theme={isEnabled && 'dark'}
                                        />
                                        <FormInput
                                            title={'producer-id'}
                                            handler={handleChange('producer_id')}
                                            blurHandler={handleBlur('producer_id')}
                                            placeholder={"Enter producer-id"}
                                            value={values.producer_id}
                                            touched={touched.producer_id}
                                            errors={errors.producer_id}
                                            theme={isEnabled && 'dark'}
                                        />
                                        <View style={styles.buttonContainer}>
                                            <FormButton
                                                modeValue='text'
                                                title='Add Station'
                                                click={(values) => handleSubmit(values)}/>
                                        </View>
                                    </View>
                                )}
                            </Formik>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
};

AddStation['navigationOptions'] = (props) => {
    const params = props.navigation.state.params || {};

    return {
        headerTintColor: params.isDarkMode ? DARK_NEUTRAL : HIGHLIGHT,
        headerTitleStyle: {color: params.isDarkMode ? DARK_NEUTRAL : HIGHLIGHT},
        headerStyle: {
            backgroundColor: params.isDarkMode ? DARK_PRIMARY : LIGHT_PRIMARY,
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
        }
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    safeAreaContainer: {
        flex: 1,
        marginTop: 15
    },
    formConteiner: {
        paddingLeft: 50,
        paddingRight: 50
    },
    buttonContainer: {
        marginTop: 50, marginBottom: 200
    }
});

export default AddStation