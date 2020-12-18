import React, {useState} from 'react';
import {Text, StyleSheet, TouchableOpacity, View, Image} from "react-native";

import {
    COLD_TEMPERATURE,
    DARK_PRIMARY,
    DARK_TEXT_COLOR,
    HIGHLIGHT,
    LIGHT_TEXT_COLOR,
    WARM_TEMPERATURE
} from "../../colors";

const StationCard = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const temperaturePattern = /[-]/;

    return (
        <View>
            {isOpen ?
                <TouchableOpacity
                    key={props.data.name}
                    style={[styles.openContainer, {backgroundColor: props.theme ? DARK_PRIMARY : HIGHLIGHT}]}
                    onPress={() => setIsOpen(false)}>
                    <View style={styles.dataContainer}>
                        <Text style={[styles.containerTitle, {color: props.theme ? DARK_TEXT_COLOR : LIGHT_TEXT_COLOR,}]}>
                            {props.data.name}
                        </Text>
                        {temperaturePattern.test(props.data.temperature) ?
                            <Text style={styles.coldTemperature}>{props.data.temperature} °C</Text> :
                            <Text style={styles.warmTemperature}>{props.data.temperature} °C</Text>
                        }
                    </View>
                    <Text style={[styles.containerDescription, {color: props.theme ? DARK_TEXT_COLOR : LIGHT_TEXT_COLOR}]}>
                        {props.data.description}
                    </Text>
                    <Text style={[styles.containerFields, {color: props.theme ? DARK_TEXT_COLOR : LIGHT_TEXT_COLOR,}]}>
                        Humidity: {props.data.humidity}
                    </Text>
                    <Text style={[styles.containerFields, {color: props.theme ? DARK_TEXT_COLOR : LIGHT_TEXT_COLOR,}]}>
                        Wind-speed: {props.data.wind_speed}
                    </Text>
                    <Text style={[styles.containerFields, {color: props.theme ? DARK_TEXT_COLOR : LIGHT_TEXT_COLOR,}]}>
                        Direction: {props.data.direction}
                    </Text>
                    <Text style={[styles.containerFields, {color: props.theme ? DARK_TEXT_COLOR : LIGHT_TEXT_COLOR,}]}>
                        Pressure: {props.data.pressure}
                    </Text>
                    <Text style={[styles.containerFields, {color: props.theme ? DARK_TEXT_COLOR : LIGHT_TEXT_COLOR,}]}>
                        Location: {props.data.location}
                    </Text>
                    <Text style={[styles.containerFields, {color: props.theme ? DARK_TEXT_COLOR : LIGHT_TEXT_COLOR,}]}>
                        Installation: {props.data.date_of_installation}
                    </Text>
                    <Text style={[styles.containerFields, {color: props.theme ? DARK_TEXT_COLOR : LIGHT_TEXT_COLOR,}]}>
                        Service: {props.data.date_of_service_work}
                    </Text>
                    <Text style={[styles.containerFields, {color: props.theme ? DARK_TEXT_COLOR : LIGHT_TEXT_COLOR,}]}>
                        Producer-id: {props.data.producer_id}
                    </Text>
                    <Image
                        style={styles.arrowUp}
                        source={require("../../assets/arrow.png")}
                        onPress
                    />
                </TouchableOpacity>
                :
                <TouchableOpacity
                    key={props.data.name}
                    style={[styles.closedContainer, {backgroundColor: props.theme ? DARK_PRIMARY : HIGHLIGHT}]}
                    onPress={() => setIsOpen(true)}>
                    <View style={styles.dataContainer}>
                        <Text style={[styles.containerTitle, {color: props.theme ? DARK_TEXT_COLOR : LIGHT_TEXT_COLOR,}]}>
                            {props.data.name}
                        </Text>
                        {temperaturePattern.test(props.data.temperature) ?
                            <Text style={styles.coldTemperature}>{props.data.temperature} °C</Text> :
                            <Text style={styles.warmTemperature}>{props.data.temperature} °C</Text>
                        }
                    </View>
                    <Text style={[styles.containerDescription, {color: props.theme ? DARK_TEXT_COLOR : LIGHT_TEXT_COLOR,}]}>
                        {props.data.description}
                    </Text>
                    <Image
                        style={styles.arrowDown}
                        source={require("../../assets/arrow.png")}
                        onPress
                    />
                </TouchableOpacity>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    closedContainer: {
        width: 315,
        height: 110,
        borderRadius: 10,
        margin: 10,
        padding: 15
    },
    openContainer: {
        width: 315,
        height: 345,
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
        fontSize: 30,
        fontWeight: '400'
    },
    coldTemperature: {
        color: COLD_TEMPERATURE,
        fontSize: 30,
        fontWeight: '500'
    },
    warmTemperature: {
        color: WARM_TEMPERATURE,
        fontSize: 30,
        fontWeight: '500'
    },
    containerDescription: {
        fontSize: 20,
        marginTop: 15,
        fontWeight: '300'
    },
    containerFields: {
        fontSize: 20,
        marginTop: 5,
        fontWeight: '300'
    },
    arrowUp: {
        height: 20,
        width: 20,
        position: 'absolute',
        bottom: 18,
        right: 18,
        transform: [{rotate: '270deg'}]
    },
    arrowDown: {
        height: 20,
        width: 20,
        position: 'absolute',
        bottom: 18,
        right: 18,
        transform: [{rotate: '90deg'}]
    }
});

export default StationCard;