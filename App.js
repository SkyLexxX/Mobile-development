import React from 'react'
import {AppearanceProvider} from 'react-native-appearance';

import AppContainer from './navigation'

export default function App() {
    return (
        <AppearanceProvider>
            <AppContainer/>
        </AppearanceProvider>
    )
}