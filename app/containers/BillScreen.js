import React, { Component } from 'react'
import { View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Linking,
  Alert
} from 'react-native'
import { connect } from 'react-redux'
import { Button } from 'react-native-elements'
import FontAwesomeIcon from '@expo/vector-icons/FontAwesome'

import BillFieldComponent from '../components/BillFieldComponent'
import { FILE_SERVER_URL } from '../conf/app.conf'

import { updateBillAction,
  dismissUpdateBillStatusErrorDialog,
  dismissBillUpdatedDialog
} from '../middleware/redux/actions/DataActions'

const REJECTED_STATUS_ID = '3578049512000'
const AGREED_STATUS_ID = '3578021701000'
const ISSUED_STATUS_ID = '3578021699000'

class BillScreen extends Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Счет № ' + navigation.state.params.number
  })

  state = {
    bill: {}
  }

  componentDidMount () {
    const { bills } = this.props.data
    const { params } = this.props.navigation.state

    const bill = bills.find((item) => item.id === params.id)
    this.setState({bill: bill})
  }

  componentWillReceiveProps (nextProps) {
    const { updateBillStatusError, billUpdated } = nextProps.data

    if (billUpdated) {
      const { goBack } = this.props.navigation
      Alert.alert( 'Внимание', 'Статус счета успешно обновлен.', [ {text: 'Закрыть', onPress: () => { goBack() }} ])
      this.props.dismissDialog()
    }

    if (updateBillStatusError) {
      Alert.alert( 'Ошибка', 'Не удалось обновить статус счета.', [ {text: 'Закрыть', onPress: () => { }} ])
      this.props.dismissErrorDialog()
    }
  }

  _handleDocumentClick = (bill) => {
    if (!bill || !bill.file) {
      Alert.alert( 'Внимание', 'У данного счета отсутствует прикрепленный документ', [ {text: 'Закрыть', onPress: () => { }} ])
    } else {
      const url = FILE_SERVER_URL + bill.file.physicalName
      console.log('url', url)
      Linking.canOpenURL(url).then(supported => {
        if (supported) {
          Linking.openURL(url)
        } else {
          Alert.alert( 'Ошибка', 'Не удалось найти программу, чтобы открыть файл данного формата', [ {text: 'Закрыть', onPress: () => { }} ])
        }
      })
    }
  }

  _handleClick = (statusId) => {
    const { bill } = this.state
    bill.status = { id: statusId }
    this.props.update(bill)
  }

  render () {
    const { bill } = this.state

    return (
      <View style={{flex: 1}}>
        <ScrollView style={{marginLeft: 10, marginRight: 10}}>
          <BillFieldComponent label='Дата' value={bill.date ? bill.date.split('T')[0] : ''} />
          <BillFieldComponent label='Контрагент' value={bill.customer && bill.customer.name} />
          <BillFieldComponent label='Объект' value={bill.property && bill.property.name} />
          <BillFieldComponent label='Сумма' value={`${bill.sum} р.`} />

          <TouchableOpacity
            onPress={() => this._handleDocumentClick(bill)}
            style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end'}}>

            <View>
              <Text style={styles.fieldLabelStyle}>Документ</Text>
              <Text style={styles.fieldStyle}>{bill.file && bill.file.name}</Text>
            </View>

            <FontAwesomeIcon name='search' size={25} style={{marginRight: 15}} />
          </TouchableOpacity>

          <BillFieldComponent label='Куратор' value={bill.curator && bill.curator.name} />
          <BillFieldComponent label='Наша компания' value={bill.company && bill.company.name} />
          <BillFieldComponent label='Статус' value={bill.status && bill.status.name} />
          <BillFieldComponent label='Примечание' value={bill.note || '-'} />

        </ScrollView>

        <View style={{flexDirection: 'row', justifyContent: 'space-around', margin: 10, marginBottom: 30}}>
          <Button
            disabled={!bill.status || bill.status.id !== ISSUED_STATUS_ID}
            onPress={() => this._handleClick(REJECTED_STATUS_ID)}
            raised
            buttonStyle={{backgroundColor: '#b3b3b3'}}
            icon={{name: 'close', type: 'font-awesome'}}
            title='ОТКЛОНИТЬ' />

          <Button
            disabled={!bill.status || bill.status.id !== ISSUED_STATUS_ID}
            onPress={() => this._handleClick(AGREED_STATUS_ID)}
            raised
            buttonStyle={{backgroundColor: 'green'}}
            icon={{name: 'check', type: 'font-awesome'}}
            title='СОГЛАСОВАТЬ' />

        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  fieldLabelStyle: {
    fontFamily: 'Arial',
    fontWeight: 'bold',
    color: '#b3b3b3',
    fontSize: 12
  },
  fieldStyle: {
    color: 'gray',
    fontSize: 18
  }
})

const mapStateToProps = (state) => {
  return {
    data: state.data.toJS()
  }
}
const mapDispatchToProps = (dispatch) => ({
  update: (bill) => dispatch(updateBillAction(bill)),
  dismissDialog: () => dispatch(dismissBillUpdatedDialog()),
  dismissErrorDialog: () => dispatch(dismissUpdateBillStatusErrorDialog())
})
export default connect(mapStateToProps, mapDispatchToProps)(BillScreen)
