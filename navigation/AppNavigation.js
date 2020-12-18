import {createStackNavigator} from 'react-navigation-stack'

import Cloud from '../screens/Home'
import Settings from '../screens/Settings'
import AddStation from '../screens/AddStation'

const AppNavigation = createStackNavigator(
    {
        Cloud: {
            screen: Cloud,
            navigationOptions: () => ({
                title: `Cloud`,
            }),
        },
        Settings: {
            screen: Settings,
            navigationOptions: () => ({
                title: `Settings`,
            }),
        },
        AddStation: {
            screen: AddStation,
            navigationOptions: () => ({
                title: `Add Station`,
            }),
        }
    },
    {
        initialRouteName: 'Cloud',
        headerMode: 'float',
        mode: "modal",
    }
);

export default AppNavigation