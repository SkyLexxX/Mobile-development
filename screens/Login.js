import React from 'react'
import {StyleSheet, View, Button, TextInput, Text, Alert } from 'react-native'
import firebase from '../api/firebase/firebase'


export default class Login extends React.Component {
    state = {
        email: '',
        password: '',
        emailError: '',
        passwordError: '',
    };

    handleEmailChange = email => {
        this.setState({email})
    };

    handlePasswordChange = password => {
        this.setState({password})
    };

    emailValidation = () => {
        if (this.state.email === '') {
            this.setState({emailError: true});
            return false
        }
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let reCheck = re.test(this.state.email);
        if (reCheck) {
            this.setState({emailError: false});
            return true
        } else {
            this.setState({emailError: true});
            return false
        }
    };

    passwordValidation = () => {
        if (this.state.password.length < 8) {
            this.setState({passwordError: true});
            return false
        } else {
            this.setState({passwordError: false});
            return true
        }
    };

    onLogin = () => {
        const email = this.emailValidation();
        const password = this.passwordValidation();
        if (email && password) {
            this.setState({
                isLoading: true,
            });
            firebase
                .auth()
                .signInWithEmailAndPassword(this.state.email, this.state.password)
                .then((res) => {
                    console.log(res);
                    console.log('User logged-in successfully!');
                    this.setState({
                        isLoading: false,
                        email: '',
                        password: ''
                    });
                    this.props.navigation.navigate('App')
                })
                .catch(error => {
                    Alert.alert(
                        "Error",
                        `${error}`,
                        [
                            { text: "OK", onPress: () => this.props.navigation.navigate('Auth') }
                        ],
                        { cancelable: true }
                    );
                })
        } else {
            if (!email) {
                this.setState({emailError: true})
            }
            if (!password) {
                this.setState({passwordError: true})
            }
            console.log('huj-s')
        }
    };

    userLogin = () => {
        if (this.state.email === '' && this.state.password === '') {
            Alert.alert('Enter details to sign in!')
        } else {
            this.setState({
                isLoading: true,
            });
            firebase
                .auth()
                .signInWithEmailAndPassword(this.state.email, this.state.password)
                .then((res) => {
                    console.log(res);
                    console.log('User logged-in successfully!');
                    this.setState({
                        isLoading: false,
                        email: '',
                        password: ''
                    });
                    this.props.navigation.navigate('Home')
                })
                .catch(error => this.setState({errorMessage: error.message}))
        }
    }

    goToSignup = () => this.props.navigation.navigate('Signup');

    render() {
        return (
            <View style={styles.container}>
                <View style={{margin: 10}}>
                    <Text
                        style={styles.star}>
                        *
                    </Text>
                    <TextInput
                        name='email'
                        value={this.state.email}
                        placeholder='Enter email'
                        autoCapitalize='none'
                        onChangeText={this.handleEmailChange}
                        onBlur={() => this.emailValidation()}
                    />
                    <Text
                        style={styles.error}>
                        {this.state.emailError ? 'error' : ''}
                    </Text>
                </View>
                <View style={{margin: 10}}>
                    <Text
                        style={styles.star}>
                        *
                    </Text>
                    <TextInput
                        name='password'
                        value={this.state.password}
                        placeholder='Enter password'
                        secureTextEntry
                        onChangeText={this.handlePasswordChange}
                        onBlur={() => this.passwordValidation()}
                    />
                    <Text
                        style={styles.error}>
                        {this.state.passwordError ? 'error' : ''}
                    </Text>
                </View>
                <Button title='Login' onPress={this.onLogin}/>
                <Button title='Go to Signup' onPress={this.goToSignup}/>
            </View>
        )
    }
}

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