import React, {useState, useEffect, useCallback} from 'react';
import {
    StyleSheet,
    SafeAreaView,
    ScrollView,
    Dimensions,
    View,
    RefreshControl,
    TouchableHighlight,
    Image,
} from 'react-native';
import ActionButton from 'react-native-action-button';
import axios from 'axios';

import StationCard from "../components/StationCard/StationCard";
import Drawer from "../components/Drawer/Drawer";
import Modal from "react-native-modal";
import firebase from "../api/firebase/firebase";
import {API} from "../enviroments";
import {DARK_NEUTRAL, DARK_PRIMARY, DARK_SECONDARY, HIGHLIGHT, LIGHT_PRIMARY, LIGHT_SECONDARY} from "../colors";

const {height} = Dimensions.get('window');
const {width} = Dimensions.get("window");

const wait = (timeout) => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
};

const Home = (props) => {
    const [stations, setStations] = useState([]);
    const [screenHeight, setScreenHeight] = useState(0);
    const [refreshing, setRefreshing] = React.useState(false);
    const [isSideMenuVisible, setIsSideMenuVisible] = React.useState(false);

    const [uid, setUid] = useState(firebase.auth().currentUser.uid);
    const [isEnabled, setIsEnabled] = useState(false);

    useEffect(() => {
        firebase
            .firestore()
            .collection('users')
            .doc(uid)
            .onSnapshot(function (doc) {
                { doc.data() && doc.data().theme ? setIsEnabled(true) : setIsEnabled(false) }
                console.log("Current data: ", doc.data());
            });
    }, [uid]);

    const onRefresh = useCallback(() => {
        setRefreshing(true);

        wait(2000).then(() => setRefreshing(false));
    }, []);

    const getStations = async () => {
        try {
            const myStations = await axios.get(API);
            setStations(myStations.data.stations);
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getStations();
        const interval = setInterval(() => {
            getStations()
        }, 1000);

        return () => clearInterval(interval)
    }, []);

    const onContentSizeChange = useCallback((contentWidth, contentHeight) => {
        setScreenHeight(contentHeight);
    });

    const scrollEnabled = screenHeight > height;

    const goToAddStation = useCallback(() => props.navigation.navigate('AddStation'));

    const goToCloud = useCallback(() => {
        props.navigation.navigate('Cloud');
        setIsSideMenuVisible(false)
    });

    const goToSettings = useCallback(() => {
        props.navigation.navigate('Settings');
        setIsSideMenuVisible(false)
    });

    useEffect(() => {
        props.navigation.setParams({
            toggleSideMenu: toggleSideMenuHandler,
            isDarkMode: isEnabled
        });
    }, [isSideMenuVisible, isEnabled]);

    const toggleSideMenuHandler = useCallback(() => setIsSideMenuVisible(!isSideMenuVisible));

    return (
        <View style={[styles.wrapper, {backgroundColor: isEnabled ? DARK_SECONDARY : LIGHT_SECONDARY}]}>
            <Modal
                isVisible={isSideMenuVisible}
                onBackdropPress={toggleSideMenuHandler}
                onSwipeComplete={toggleSideMenuHandler}
                animationIn="slideInLeft"
                animationOut="slideOutLeft"
                swipeDirection="left"
                useNativeDriver
                hideModalContentWhileAnimating
                propagateSwipe
                style={styles.sideMenuStyle}
            >
                <Drawer isEnabled={isEnabled} home={goToCloud} settings={goToSettings} nav={props.navigation}/>
            </Modal>
            <SafeAreaView style={styles.container}>
                <ScrollView
                    style={{flex: 1}}
                    contentContainerStyle={{flexGrow: 1}}
                    scrollEnabled={scrollEnabled}
                    onContentSizeChange={onContentSizeChange}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
                    }
                >
                    <View style={styles.contentContainer}>
                        {stations.map(station =>
                            <StationCard key={station.name} data={station} theme={isEnabled}/>
                        )}
                        {stations.map(station =>
                            <StationCard key={station.name} data={station} theme={isEnabled}/>
                        )}
                    </View>
                </ScrollView>
            </SafeAreaView>

            <ActionButton buttonColor={isEnabled ? DARK_PRIMARY : LIGHT_PRIMARY} onPress={() => goToAddStation()}/>
        </View>
    );
};

Home['navigationOptions'] = (props) => {
    const params = props.navigation.state.params || {};

    return {
        headerTitleStyle: {color: params.isDarkMode ? DARK_NEUTRAL : HIGHLIGHT},
        headerStyle: {
            backgroundColor: params.isDarkMode ? DARK_PRIMARY : LIGHT_PRIMARY,
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
        },
        headerLeft: () =>
            <TouchableHighlight onPress={params.toggleSideMenu}>
                <Image
                    style={styles.menuIcon}
                    source={params.isDarkMode ? require("../assets/menu1.png") : require("../assets/menu.png")}
                    onPress
                />
            </TouchableHighlight>
    };
};

const styles = StyleSheet.create({
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%'
    },
    container: {
        flex: 1,
        marginTop: 15,
    },
    scrollView: {
        backgroundColor: 'pink',
        marginHorizontal: 20,
    },
    contentContainer: {
        width: 350,
        display: 'flex',
        alignItems: 'center'
    },
    text: {
        fontSize: 42,
    },
    sideMenuStyle: {
        margin: 0,
        width: width * 0.75 // SideMenu width
    },
    menuIcon: {
        width: 30,
        height: 30,
        margin: 10
    }
});

export default Home