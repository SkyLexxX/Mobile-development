import React, {useState, useEffect} from 'react';
import {StyleSheet, SafeAreaView, ScrollView, Dimensions, View, RefreshControl} from 'react-native';
import ActionButton from 'react-native-action-button';
import axios from 'axios';

import StationCard from "../components/StationCard/StationCard";

const {height} = Dimensions.get('window');

const wait = (timeout) => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
};

const Home = (props) => {
    const [stations, setStations] = useState([]);
    const [screenHeight, setScreenHeight] = useState(0);
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);

        wait(2000).then(() => setRefreshing(false));
    }, []);

    const getStations = async () => {
        try {
            const myStations = await axios.get("http://weatherapp.eba-7cfnuwsm.eu-west-1.elasticbeanstalk.com/api/stations/");
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

    const onContentSizeChange = (contentWidth, contentHeight) => {
        setScreenHeight(contentHeight);
    };

    const scrollEnabled = screenHeight > height;

    const goToAddStation = () => props.navigation.navigate('AddStation');

    return (
        <View style={styles.wrapper}>
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
                            <StationCard key={station.name} data={station}/>
                        )}
                        {stations.map(station =>
                            <StationCard key={station.name} data={station}/>
                        )}
                    </View>
                </ScrollView>
            </SafeAreaView>

            <ActionButton buttonColor="#4d2c91" onPress={() => goToAddStation()}/>
        </View>
    );
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
});

export default Home