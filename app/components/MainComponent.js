import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from '@expo/vector-icons/MaterialIcons';

import { Images, Colors, Metrics } from '../theme'

var screen = 'orders'

export default MainComponent = (props) => {
    return (
        <View style={styles.mainContainer}>
            {
                /*<View style={styles.headerContainer}>
                    <Image source={Images.zhukovHeader} style={styles.headerImage} />
                </View>*/
            }

            <View style={styles.contentContainer}>
                <View style={styles.ButtonsContainer}>

                    <TouchableOpacity onPress={() => { props.openBills(); screen = 'bills' }}>
                        <View style={styles.Button}>
                            <Image resizeMode='contain' source={Images.businessman} style={styles.buttonImage} />
                            <Text style={styles.buttonLabel}>Работать со счетами</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { props.openOrders(); screen = 'orders' }}>
                        <View style={styles.Button}>
                            <Image resizeMode='contain' source={Images.list} style={styles.buttonImage}/>
                            <Text style={styles.buttonLabel}>Работать с заказами</Text>
                        </View>
                    </TouchableOpacity>

                </View>

            </View>
        </View>
    )
}
export { screen as currentScreen }

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        backgroundColor: Colors.backgroundColor
    },
    headerContainer: {
        height: 240,
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        overflow: 'hidden'
    },
    headerImage: {
        width: '100%',
        resizeMode: 'stretch'
    },
    contentContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: 59,
        backgroundColor: '#627ab4'
    },
    menuIcon: {
        paddingLeft: 14,
        color: 'white'
    },
    title: {
        fontSize: 22,
        color: 'white'
    },
    settingsIcon: {
        paddingRight: 4,
        color: 'white'
    },
    ButtonsContainer: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        margin: 14
    },
    Button: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: 158,
        margin: 14,
        borderRadius: 15,
        backgroundColor: 'white'
    },
    buttonImage: {
        width: 90,
        height: 90,
        marginTop: 10
    },
    buttonLabel: {
        marginTop: 5,
        fontSize: 20
    },
    touchableContainer: {
        height: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 7
    },
    touchableLabel: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: Colors.text,
    }
})
