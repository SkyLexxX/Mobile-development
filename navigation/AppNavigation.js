import {createStackNavigator} from 'react-navigation-stack'
import Home from '../screens/Home'
import Cloud from '../screens/Cloud'
import AddStation from '../screens/AddStation'

const AppNavigation = createStackNavigator(
    {
        Home: {
            screen: Home,
            navigationOptions: () => ({
                title: `Home`,
                headerStyle: {backgroundColor: "#4d2c91"},
                headerTitleStyle: {color: "#FFFFFF"}
            }),
        },
        Cloud: {
            screen: Cloud,
            navigationOptions: () => ({
                title: `Cloud`,
                headerStyle: {backgroundColor: "#4d2c91"},
                headerTitleStyle: {color: "#FFFFFF"}
            }),
        },
        AddStation: {
            screen: AddStation,
            navigationOptions: () => ({
                title: `Add Station`,
                headerStyle: {backgroundColor: "#4d2c91"},
                headerTitleStyle: {color: "#FFFFFF"}
            }),
        }
    },
    {
        initialRouteName: 'Home',
        headerMode: 'float',
        mode: "modal",
    }
);

export default AppNavigation