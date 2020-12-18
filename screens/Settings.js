import React, {useState, useEffect, useCallback} from 'react';
import {
    SafeAreaView,
    View,
    Switch,
    Image,
    Text, StyleSheet
} from 'react-native';
import firebase from "../api/firebase/firebase";
import {
    DARK_NEUTRAL, DARK_PRIMARY,
    DARK_SECONDARY,
    HIGHLIGHT, LIGHT_PRIMARY,
    LIGHT_SECONDARY,
    LIGHT_TEXT_COLOR,
    SWITCH_GREEN,
    SWITCH_GREY
} from "../colors";

const Settings = (props) => {

    const [uid, setUid] = useState(firebase.auth().currentUser.uid);
    const [isEnabled, setIsEnabled] = useState(false);

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

    const toggleSwitch = useCallback(() => {
        firebase.firestore().collection('users').doc(uid).set({theme: !isEnabled});
        setIsEnabled(!isEnabled);
    });

    useEffect(() => {
        props.navigation.setParams({
            isDarkMode: isEnabled
        });
    }, [isEnabled]);

    return (
        <SafeAreaView style={[styles.container, {backgroundColor: isEnabled ? DARK_SECONDARY : LIGHT_SECONDARY}]}>
            <View style={styles.wrapper}>
                <View style={styles.checkboxContainer}>
                    {isEnabled ?
                        <Image
                            style={styles.icon}
                            source={require("../assets/light.png")}
                        />
                        :
                        <Image
                            style={styles.icon}
                            source={require("../assets/dark.png")}
                        />
                    }
                    <Text style={[styles.checkboxTitle, {color: isEnabled ? HIGHLIGHT : LIGHT_TEXT_COLOR, }]}>Dark theme</Text>
                    <View style={styles.switcher}>
                        <Switch
                            trackColor={{false: SWITCH_GREY, true: SWITCH_GREEN}}
                            thumbColor={'white'}
                            ios_backgroundColor={SWITCH_GREY}
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                        />
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
};

Settings['navigationOptions'] = (props) => {
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
        flex: 1
    },
    wrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
        height: 100
    },
    checkboxContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30
    },
    icon: {
        height: 30,
        width: 30,
        marginLeft: 25
    },
    checkboxTitle: {
        fontSize: 16,
        paddingLeft: 25,
        paddingRight: 25,
        width: '68%'
    },
    switcher: {
        position: 'relative',
        right: 0
    }
});

export default Settings;