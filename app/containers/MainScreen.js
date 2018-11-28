import React, { Component } from 'react'
import { View, Text, Alert, StatusBar } from 'react-native'
import { connect } from 'react-redux'
import MainComponent from '../components/MainComponent'

export default class MainScreenContainer extends Component {
    static navigationOptions = ({navigation}) => {
        return ({
            title: 'Кларис'
        })
    }

    render = () => {
        const { navigate } = this.props.navigation

        return (
            <View>
                <StatusBar barStyle='light-content' />
                <MainComponent
                    openBills={() => navigate('Bills')}
                    openOrders={() => navigate('Orders')}
                />
            </View>
        )
    }
}
