import React from 'react'
import {StyleSheet, View, TextInput, Text, Dimensions} from 'react-native'
import {BULLET} from "../../enviroments";

const {width, height} = Dimensions.get('screen');

const formInput = props => {

    const capitalizeHandler = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    const hasLowerCase = (str) => {
        return (/[a-z]/.test(str));
    };

    const hasUpperCase = (str) => {
        return (/[A-Z]/.test(str));
    };

    const hasNumber = (str) => {
        return (/[0-9]/.test(str));
    };

    const hasSpecialChar = (str) => {
        return (/[!@#\$%\^&\*]/.test(str));
    };

    const checkbox = (values) => (
        <View>
            <Text style={values.password.length < 8 ? styles.error : styles.success}>
                {"\t"}{BULLET}8 Characters
            </Text>
            <Text style={hasUpperCase(values.password) ? styles.success : styles.error}>
                {"\t"}{BULLET}One Uppercase
            </Text>
            <Text style={hasLowerCase(values.password) ? styles.success : styles.error}>
                {"\t"}{BULLET}One Lowercase
            </Text>
            <Text style={hasNumber(values.password) ? styles.success : styles.error}>
                {"\t"}{BULLET}One Number
            </Text>
            <Text style={hasSpecialChar(values.password) ? styles.success : styles.error}>
                {"\t"}{BULLET}One special case Character
            </Text>
        </View>
    );

    return (
        <View>
            <View style={{marginTop: 10, marginBottom: 10}}>
                <Text>
                    {capitalizeHandler(props.title)}
                </Text>
                <TextInput
                    style={props.touched && props.errors ? styles.onErrorInput : styles.input}
                    onChangeText={props.handler}
                    onBlur={props.blurHandler}
                    placeholder={props.placeholder}
                    value={props.value}
                    {...props}
                />
                {props.title !== 'password' ?
                    props.touched && props.errors && <Text style={styles.error}>{props.errors}</Text>
                    :
                    props.touched && props.errors ?
                        <View>
                            {props.errors === 'Password is required' ?
                                <Text style={styles.error}>{props.errors}</Text> :
                                <View>
                                    <Text style={{fontWeight: 'bold', color: 'red'}}>Must contain:</Text>
                                    <Text>{checkbox(props.checkboxValue)}</Text>
                                </View>
                            }
                        </View>
                        : null}
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    error: {
        color: 'red'
    },
    success: {
        color: 'green'
    },
    input: {
        width: width / 1.4,
        height: height / 15,
        padding: 15,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#C2C2C2",
    },
    onErrorInput: {
        width: width / 1.4,
        height: height / 15,
        padding: 15,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: "red",
    }
});

export default formInput