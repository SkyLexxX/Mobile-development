import React, {useState, useCallback} from "react";
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight,
} from "react-native";

import FormButton from "../FormButton/FormButton";
import firebase from "../../api/firebase/firebase";
import {
    DARK_NEUTRAL,
    DARK_PRIMARY,
    DARK_SECONDARY,
    HIGHLIGHT, LIGHT_BACKGROUND,
    LIGHT_NEUTRAL,
    LIGHT_PRIMARY,
    LIGHT_TEXT_COLOR
} from "../../colors";

const Drawer = (props) => {
    const [displayName, setDisplayName] = useState(firebase.auth().currentUser.displayName);

    const signOut = useCallback(() => {
        firebase.auth().signOut().then(() => {
            props.nav.navigate('Login')
        })
            .catch(error => console.log(error))
    });

    return (
        <React.Fragment>
            <View style={{height: 140}}>
                <SafeAreaView
                    style={[styles.containerHeader, {backgroundColor: props.isEnabled ? DARK_PRIMARY : LIGHT_PRIMARY}]}>
                    <View
                        style={[styles.welcomeContainer, {backgroundColor: props.isEnabled ? DARK_PRIMARY : LIGHT_PRIMARY,}]}>
                        <Text style={[styles.welcomeTitle, {color: HIGHLIGHT}]}>Welcome</Text>
                        <Text style={[styles.welcomeUserName, {color: HIGHLIGHT}]}>{displayName}</Text>
                    </View>
                </SafeAreaView>
            </View>
            <SafeAreaView
                style={[styles.containerHeader, {backgroundColor: props.isEnabled ? DARK_SECONDARY : LIGHT_BACKGROUND}]}>
                <View style={styles.container}>
                    <TouchableHighlight onPress={props.home}>
                        <View style={styles.menuItemContainer}>
                            <Image
                                style={styles.icon}
                                source={require("../../assets/home1.png")}
                            />
                            <Text
                                style={[styles.menuItemText, {color: props.isEnabled ? DARK_NEUTRAL : LIGHT_TEXT_COLOR,}]}>
                                Home
                            </Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={props.settings}>
                        <View style={styles.menuItem}>
                            <Image
                                style={styles.icon}
                                source={require("../../assets/settings1.png")}
                            />
                            <Text
                                style={[styles.menuItemText, {color: props.isEnabled ? DARK_NEUTRAL : LIGHT_TEXT_COLOR,}]}>
                                Settings
                            </Text>
                        </View>
                    </TouchableHighlight>
                </View>
                <View style={[styles.buttonContainer, {borderColor: props.isEnabled ? DARK_PRIMARY : LIGHT_NEUTRAL}]}>
                    <FormButton modeValue='text' title='LOG OUT' click={() => signOut()}/>
                </View>
            </SafeAreaView>
        </React.Fragment>
    );
};

const styles = StyleSheet.create({
    containerHeader: {
        flex: 1
    },
    welcomeContainer: {
        width: '100%',
        height: 100,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingLeft: 25,
    },
    welcomeTitle: {
        fontSize: 18,
    },
    welcomeUserName: {
        fontSize: 30,
        fontWeight: '500'
    },
    title: {
        marginTop: 15,
        marginBottom: 10,
        color: "#444",
        fontSize: 14
    },
    container: {
        margin: 25,
        flex: 1
    },
    menuItemContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 30
    },
    menuItem: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuItemText: {
        fontSize: 16,
        paddingLeft: 25
    },
    icon: {
        height: 25,
        width: 25
    },
    buttonContainer: {
        borderTopWidth: 3,
        paddingTop: 20
    },
    swithBlock: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    description: {
        fontSize: 13,
        color: "#555",
        marginTop: 12,
        marginBottom: 6
    }
});

export default Drawer;