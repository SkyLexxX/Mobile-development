import React from 'react'
import {Button} from 'react-native'

const formButton = props => {
    return (
        <Button
            {...props}
            mode='contained'
            title={props.title}
            onPress={props.click}
        />
    )
};

export default formButton