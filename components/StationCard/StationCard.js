import React, {useState} from 'react';
import {Text, StyleSheet, TouchableOpacity, View} from "react-native";

const StationCard = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const temperaturePattern = /[-]/;

    return (
        <View>
            {isOpen ?
                <TouchableOpacity
                    key={props.data.name}
                    style={styles.openContainer}
                    onPress={() => setIsOpen(false)}>
                    <View style={styles.dataContainer}>
                        <Text style={styles.containerTitle}>{props.data.name}</Text>
                        {temperaturePattern.test(props.data.temperature) ?
                            <Text style={styles.coldTemperature}>{props.data.temperature}</Text> :
                            <Text style={styles.warmTemperature}>{props.data.temperature}</Text>
                        }
                    </View>
                    <Text style={styles.containerDescription}>{props.data.description}</Text>
                    <Text style={styles.containerFields}>Humidity: {props.data.humidity}</Text>
                    <Text style={styles.containerFields}>Wind-speed: {props.data.wind_speed}</Text>
                    <Text style={styles.containerFields}>Direction: {props.data.direction}</Text>
                    <Text style={styles.containerFields}>Pressure: {props.data.pressure}</Text>
                    <Text style={styles.containerFields}>Location: {props.data.location}</Text>
                    <Text style={styles.containerFields}>Installation: {props.data.date_of_installation}</Text>
                    <Text style={styles.containerFields}>Service: {props.data.date_of_service_work}</Text>
                    <Text style={styles.containerFields}>Producer-id: {props.data.producer_id}</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity
                    key={props.data.name}
                    style={styles.closedContainer}
                    onPress={() => setIsOpen(true)}>
                    <View style={styles.dataContainer}>
                        <Text style={styles.containerTitle}>{props.data.name}</Text>
                        {temperaturePattern.test(props.data.temperature) ?
                            <Text style={styles.coldTemperature}>{props.data.temperature}</Text> :
                            <Text style={styles.warmTemperature}>{props.data.temperature}</Text>
                        }
                    </View>
                    <Text style={styles.containerDescription}>{props.data.description}</Text>
                </TouchableOpacity>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    closedContainer: {
        width: 315,
        height: 110,
        backgroundColor: '#b085f5',
        borderRadius: 10,
        margin: 10,
        padding: 15
    },
    openContainer: {
        width: 315,
        height: 345,
        backgroundColor: '#b085f5',
        borderRadius: 10,
        margin: 10,
        padding: 15
    },
    dataContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    containerTitle: {
        color: 'black',
        fontSize: 30,
        fontWeight: '500'
    },
    coldTemperature: {
        color: 'blue',
        fontSize: 30,
        fontWeight: '500'
    },
    warmTemperature: {
        color: 'red',
        fontSize: 30,
        fontWeight: '500'
    },
    containerDescription: {
        color: 'black',
        fontSize: 20,
        marginTop: 15
    },
    containerFields: {
        color: 'black',
        fontSize: 20,
        marginTop: 5
    }
});

export default StationCard;