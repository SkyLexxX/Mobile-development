import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Button, Switch} from 'react-native';

import firebase from '../api/firebase/firebase'


const Home = (props) => {
    const [uid, setUid] = useState(firebase.auth().currentUser.uid);
    const [displayName, setDisplayName] = useState(firebase.auth().currentUser.displayName);
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => {
        console.log('toggleSwitch1', isEnabled);
        firebase.firestore().collection('users').doc(uid).set({theme: !isEnabled});
        setIsEnabled(!isEnabled);
        console.log('toggleSwitch2', isEnabled);
    };

    const signOut = () => {
        firebase.auth().signOut().then(() => {
            props.navigation.navigate('Login')
        })
            .catch(error => console.log(error))
    };

    const goToCloud = () => props.navigation.navigate('Cloud');

    useEffect(() => {
        firebase
            .firestore()
            .collection('users')
            .doc(uid)
            .onSnapshot(function (doc) {
                // setIsEnabled(doc.data());
                { doc.data() && doc.data().theme ? setIsEnabled(true) : setIsEnabled(false) }
                // setIsEnabled(!isEnabled);
                console.log("Current data: ", doc.data());
            });
    }, [uid]);

    return (
        <View style={isEnabled ? styles.containerBlack : styles.container}>
            <Text style={isEnabled ? {color: 'white'} : {color: 'black'}}>
                Hello, {displayName}
            </Text>
            <Switch
                trackColor={{false: "#8e8e93", true: "#53d769"}}
                thumbColor={'white'}
                ios_backgroundColor="#8e8e93"
                onValueChange={toggleSwitch}
                value={isEnabled}
            />
            <Button
                color="#3740FE"
                title="Logout"
                onPress={() => signOut()}
            />
            {/*<View style={{marginTop: 40}}>*/}
                <Button
                    color="#3740FE"
                    title="Go To Cloud"
                    onPress={() => goToCloud()}
                />
            {/*</View>*/}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
        padding: 35,
        backgroundColor: 'white',
    },
    containerBlack: {
        flex: 1,
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
        padding: 35,
        backgroundColor: 'black',
    },
    textStyle: {
        fontSize: 15,
        marginBottom: 20
    }
});

export default Home