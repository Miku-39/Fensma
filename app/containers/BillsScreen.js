import React, { Component } from 'react'
import { View, FlatList, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import Icon from '@expo/vector-icons/MaterialIcons'
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view'
import { Header } from 'react-native-elements'

import {
  billsFetchRequestedAction,
  dismissBillsFetchingErrorDialogAction
} from '../middleware/redux/actions/DataActions'


const status2colors = {
  null: 'gray',
  '3578021699000': '#FFC433',//Выписан
  '3578021701000': '#00CC00',//Согласован
  '3578021705000': '#1ec3c3',//Подвешен в 1С
  '3578049512000': '#FF0000',//Отклонен
  '3578215687000': '#CC99FF'//Оплачен
}
const ISSUED_STATUS_ID = '3578021699000'

const extractKey = ({id}) => id

class BillsScreen extends Component {
  state = {
    bills: []
  }

  componentDidMount () {
    //this.props.navigation.setParams({handleRefresh: this._handleRefresh})
    this.props.fetch()
  }

  componentWillReceiveProps (nextProps) {
    const { bills, error, billUpdated } = nextProps.data
    this.setState({bills: bills})

    if (error) {
//      Alert.alert( 'Ошибка', error, [ {text: 'Закрыть', onPress: () => { }} ])
    }

    if (billUpdated){
      this.props.fetch()
    }
  }

  _handleRefresh = () => {
    this.props.fetch()
    console.log('refresh clicked')
  }

  _handleClick = (item) => {
    const { navigate } = this.props.navigation
    navigate('Bill', { number: item.number, id: item.id })
  }

  _renderItem = ({item}) => {
    return (
      <TouchableOpacity onPress={() => this._handleClick(item)}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white', margin: 1, borderRadius: 5}}>
          <View style={{flexDirection: 'row', width: '72%'}}>
            <View style={{width: 5, marginTop: 8, marginBottom: 10, backgroundColor: status2colors[item.status.id], borderRadius: 5}}></View>
            <View style={{flexDirection: 'column', marginLeft: 8, marginTop: 2, marginBottom: 8}}>
              <Text numberOfLines={2} style={{fontSize: 16, color: 'black'}}>{ item.customer && item.customer.name }</Text>
              <Text style={{fontSize: 12, color: '#767878'}}>{ item.property && item.property.name }</Text>
              <Text style={{fontSize: 10, color: status2colors[item.status.id], fontStyle: 'italic', marginRight: 5}}>
                { item.status && item.status.name}
              </Text>
            </View>
          </View>
          <View style={{marginTop: 3, width: '28%'}}>
            <Text style={{fontSize: 16, color: 'black', textAlign: 'right', marginRight: 10}}>
              { `${item.sum} р` }
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

 flag = false

  render () {
    const { bills } = this.state
    const filtered = bills.filter(item => item.status.id === ISSUED_STATUS_ID)

    return (
      <View style={{flex: 1}}>
        <Header
          backgroundColor='#627ab4'
          outerContainerStyles={{ backgroundColor: '#627ab4', height: 74 }}
          leftComponent={<Text style={{color: 'white', fontSize: 19, fontWeight: 'bold'}}>Счета</Text>}
          rightComponent={
            <TouchableOpacity style={{marginTop: 20}}>
              <Icon name='search' size={25} color='white' />
            </TouchableOpacity>
          }
        />

        <ScrollableTabView style={{marginTop: -10}}
          tabBarBackgroundColor='#627ab4'
          tabBarPosition='top'
          tabBarActiveTextColor='white'
          tabBarInactiveTextColor='white'
          tabBarUnderlineStyle={{backgroundColor: 'white'}}
          tabBarTextStyle={{fontSize: 12}}>

          <View tabLabel='ВЫПИСАННЫЕ'>
            <FlatList
              data={filtered}
              renderItem={this._renderItem}
              keyExtractor={extractKey} />
          </View>

          <View tabLabel='ВСЕ'>
            <FlatList
              data={bills}
              renderItem={this._renderItem}
              keyExtractor={extractKey} />
          </View>

        </ScrollableTabView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.data.toJS()
  }
}
const mapDispatchToProps = (dispatch) => ({
  fetch: (user, password) => dispatch(billsFetchRequestedAction()),
//  dismissErrorDialog: () => dispatch(dismissBillsFetchingErrorDialogAction())
})
export default connect(mapStateToProps, mapDispatchToProps)(BillsScreen)
