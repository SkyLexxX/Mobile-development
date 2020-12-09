import React from 'react';
import {StyleSheet, SafeAreaView, ScrollView, Keyboard, View, TouchableWithoutFeedback} from 'react-native';
import {Formik} from "formik";
import * as Yup from "yup";
import axios from 'axios';

import FormInput from "../components/FormInput/FormInput";
import FormButton from "../components/FormButton/FormButton";



const AddStation = (props) => {

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

    const submit = (values) => {
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
    };

    return (
        <View style={styles.container}>
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
                                        />
                                        <FormInput
                                            title={'description'}
                                            handler={handleChange('description')}
                                            blurHandler={handleBlur('description')}
                                            placeholder={"Enter description"}
                                            value={values.description}
                                            touched={touched.description}
                                            errors={errors.description}
                                        />
                                        <FormInput
                                            title={'temperature'}
                                            handler={handleChange('temperature')}
                                            blurHandler={handleBlur('temperature')}
                                            placeholder={"Enter temperature"}
                                            value={values.temperature}
                                            touched={touched.temperature}
                                            errors={errors.temperature}
                                        />
                                        <FormInput
                                            title={'humidity'}
                                            handler={handleChange('humidity')}
                                            blurHandler={handleBlur('humidity')}
                                            placeholder={"Enter humidity"}
                                            value={values.humidity}
                                            touched={touched.humidity}
                                            errors={errors.humidity}
                                        />
                                        <FormInput
                                            title={'windSpeed'}
                                            handler={handleChange('windSpeed')}
                                            blurHandler={handleBlur('windSpeed')}
                                            placeholder={"Enter wind-speed"}
                                            value={values.windSpeed}
                                            touched={touched.windSpeed}
                                            errors={errors.windSpeed}
                                        />
                                        <FormInput
                                            title={'direction'}
                                            handler={handleChange('direction')}
                                            blurHandler={handleBlur('direction')}
                                            placeholder={"Enter direction"}
                                            value={values.direction}
                                            touched={touched.direction}
                                            errors={errors.direction}
                                        />
                                        <FormInput
                                            title={'pressure'}
                                            handler={handleChange('pressure')}
                                            blurHandler={handleBlur('pressure')}
                                            placeholder={"Enter pressure"}
                                            value={values.pressure}
                                            touched={touched.pressure}
                                            errors={errors.pressure}
                                        />
                                        <FormInput
                                            title={'location'}
                                            handler={handleChange('location')}
                                            blurHandler={handleBlur('location')}
                                            placeholder={"Enter location"}
                                            value={values.location}
                                            touched={touched.location}
                                            errors={errors.location}
                                        />
                                        <FormInput
                                            title={'Installation'}
                                            handler={handleChange('dateOfInstallation')}
                                            blurHandler={handleBlur('dateOfInstallation')}
                                            placeholder={"Enter date"}
                                            value={values.dateOfInstallation}
                                            touched={touched.dateOfInstallation}
                                            errors={errors.dateOfInstallation}
                                        />
                                        <FormInput
                                            title={'Service'}
                                            handler={handleChange('dateOfServiceWork')}
                                            blurHandler={handleBlur('dateOfServiceWork')}
                                            placeholder={"Enter date"}
                                            value={values.dateOfServiceWork}
                                            touched={touched.dateOfServiceWork}
                                            errors={errors.dateOfServiceWork}
                                        />
                                        <FormInput
                                            title={'producer-id'}
                                            handler={handleChange('producer_id')}
                                            blurHandler={handleBlur('producer_id')}
                                            placeholder={"Enter producer-id"}
                                            value={values.producer_id}
                                            touched={touched.producer_id}
                                            errors={errors.producer_id}
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
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%'
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