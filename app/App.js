import React, { Component } from 'react'
import {
  Platform,
  StyleSheet
} from 'react-native'
import { Provider } from 'react-redux'
import { StackNavigator } from 'react-navigation'

import store from './middleware/redux'
import LoginScreen from './containers/LoginScreen'
import MainScreen from './containers/MainScreen'
import BillsScreen from './containers/BillsScreen'
import BillScreen from './containers/BillScreen'
import DocumentScreen from './containers/DocumentScreen'
import OrdersScreen from './containers/OrdersScreen'
import OrderScreen from './containers/OrderScreen'


import api from './middleware/api'
import { Metrics } from './theme'

import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

const styles = StyleSheet.create({
    back: {
        backgroundColor: '#627ab4'
    },
    title: { color: 'white' }
})

const Navigation = StackNavigator({
    Login: { screen: LoginScreen, navigationOptions: { header: null } },
    Main: { screen: MainScreen, navigationOptions: { header: null } },
    Bills: { screen: BillsScreen, navigationOptions: { header: null } },
    Bill: { screen: BillScreen },
    Orders: { screen: OrdersScreen, navigationOptions: { header: null }},
    Order: { screen: OrderScreen },
    Document: { screen: DocumentScreen }
}, {
    initialRouteName: 'Login',
    navigationOptions: {
        headerStyle: styles.back,
        headerTitleStyle: styles.title,
        headerTintColor: 'white'
    }
})

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Navigation />
            </Provider>
        )
    }
}
