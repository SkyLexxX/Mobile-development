import React from 'react'
import {StyleSheet, Text, View, Button, TextInput, Alert} from 'react-native'
import firebase from '../api/firebase/firebase'


export default class Signup extends React.Component {
    state = {
        email: '',
        password: '',
        phone: '',
        name: '',
        emailError: false,
        passwordError: false,
        phoneError: false,
        nameError: false,
    };

    handleNameChange = name => {
        this.setState({name})
    };

    handlePhoneChange = phone => {
        this.setState({phone})
    };

    handleEmailChange = email => {
        this.setState({email});
        // this.emailValidation();
    };

    handlePasswordChange = password => {
        this.setState({password});
        // this.passwordValidation();
    };

    onSignup = () => {
        const email = this.emailValidation();
        const password = this.passwordValidation();
        const name = this.nameValidation();
        const phone = this.phoneValidation();
        if (email && password && name && phone) {
            this.setState({
                isLoading: true,
            });
            firebase
                .auth()
                .createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then((res) => {
                    res.user.updateProfile({
                        displayName: this.state.name,
                        phone: this.state.phone
                    });
                    console.log('User registered successfully!');
                    firebase
                        .auth()
                        .signInWithEmailAndPassword(this.state.email, this.state.password)
                        .then((res) => {
                            console.log(res);
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
                        });
                    this.setState({
                        isLoading: false,
                        displayName: '',
                        email: '',
                        password: '',
                        name: '',
                        phone: ''
                    });
                })
                .catch(error =>
                    Alert.alert(
                        "Error",
                        `${error}`,
                        [
                            { text: "OK", onPress: () => this.props.navigation.navigate('Auth') }
                        ],
                        { cancelable: true }
                    )
                )
        } else {
            if (!email) { this.setState({emailError: true})}
            if (!password) { this.setState({passwordError: true})}
            if (!name) { this.setState({nameError: true})}
            if (!phone) { this.setState({phoneError: true})}
            console.log('huj-s')
        }
    };

    registerUser = () => {
        if(this.state.email === '' && this.state.password === '') {
            Alert.alert('Enter details to sign up!')
        } else {
            this.setState({
                isLoading: true,
            });
            firebase
                .auth()
                .createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then((res) => {
                    res.user.updateProfile({
                        displayName: this.state.displayName
                    });
                    console.log('User registered successfully!');
                    this.setState({
                        isLoading: false,
                        displayName: '',
                        email: '',
                        password: ''
                    });
                    this.props.navigation.navigate('Login')
                })
                .catch(error => this.setState({ errorMessage: error.message }))
        }
    };

    nameValidation = () => {
        if (this.state.name.trim().length < 1) {
            this.setState({nameError: true});
            return false
        } else {
            this.setState({nameError: false});
            return true
        }
    };

    phoneValidation = () => {
        console.log(this.state.phone, 'huj');
        if (this.state.phone.length < 10) {
            this.setState({phoneError: true});
            return false
        } else {
            this.setState({phoneError: false});
            return true
        }
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

    goToLogin = () => this.props.navigation.navigate('Login');

    render() {
        return (
            <View style={styles.container}>
                <View style={{margin: 10}}>
                    <Text
                        style={styles.star}>
                        *
                    </Text>
                    <TextInput
                        name='name'
                        value={this.state.name}
                        placeholder='Enter name'
                        autoCapitalize='none'
                        onChangeText={this.handleNameChange}
                        onBlur={() => this.nameValidation()}
                    />
                    <Text
                        style={styles.error}>
                        {this.state.nameError ? 'error' : ''}
                    </Text>
                </View>
                <View style={{margin: 10}}>
                    <Text
                        style={styles.star}>
                        *
                    </Text>
                    <TextInput
                        name='phone'
                        value={this.state.phone}
                        placeholder='Enter phone'
                        autoCapitalize='none'
                        keyboardType='numeric'
                        onChangeText={this.handlePhoneChange}
                        onBlur={() => this.phoneValidation()}
                    />
                    <Text
                        style={styles.error}>
                        {this.state.phoneError ? 'error' : ''}
                    </Text>
                </View>
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
                <Button title='Signup' onPress={this.onSignup}/>
                <Button title='Go to Login' onPress={this.goToLogin}/>
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