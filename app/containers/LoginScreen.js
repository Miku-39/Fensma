import React, { Component } from 'react'
import { View, StatusBar, Alert, AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'

import { loginRequestedAction, dismissLoginErrorDialog } from '../middleware/redux/actions/SessionActions'
import LoginComponent from '../components/LoginComponent'


class LoginScreen extends Component {
  static navigationOptions = ({header: null})
  state = { user: '', password: '', remember: false}

  componentDidMount = async () => {
    try {
      const r = await AsyncStorage.getItem('@fensmamobileapp:remember')
      const remember = r === 'true'
      const user = await AsyncStorage.getItem('@fensmamobileapp:user')
      const password = await AsyncStorage.getItem('@fensmamobileapp:password')

      if (remember && user && password)
        this.setState({remember, user, password})

    } catch (error) {
      console.warn('error occured while retrieving user info', error)
    }
  }

  componentWillReceiveProps = async (nextProps) => {
    const { token, error } = nextProps.session
    const { navigate } = this.props.navigation

    if (token) {
      await this._rememberUser()

      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'Main'})
        ],
        key: null
      })
      this.props.navigation.dispatch(resetAction)
    }

    if (error) {
      Alert.alert( 'Ошибка', error, [ {text: 'Закрыть', onPress: () => { }} ])
      this.props.dismissErrorDialog()
    }
  }

  _rememberUser = async () => {
    let { remember, user, password } = this.state

    if (!remember)
      return

    try {
      await AsyncStorage.setItem('@fensmamobileapp:remember', String(remember))
      await AsyncStorage.setItem('@fensmamobileapp:user', user)
      await AsyncStorage.setItem('@fensmamobileapp:password', password)
    } catch (error) {
      console.warn('error occured while saving user info', error)
    }
  }

  _handleUserChange = (user) => this.setState({user})

  _handlePasswordChange = (password) => this.setState({password})

  _handleRememberChange = () => {
    const { remember } = this.state
    this.setState({remember: !remember})
  }

  _handleLogInClick = () => {
    const { user, password } = this.state
    if (!user || !password)
      Alert.alert( 'Ошибка', 'Необходимо заполнить имя пользователя и пароль', [ {text: 'Закрыть', onPress: () => { }} ])
    else this.props.login(user, password)
  }

  render = () => {
    const { user, password, remember } = this.state
    const { inProgress } = this.props.session

    return (
      <LoginComponent
        user={user}
        password={password}
        disabled={inProgress}
        remember={remember}
        changeUser={this._handleUserChange}
        changePassword={this._handlePasswordChange}
        changeRemember={this._handleRememberChange}
        logIn={this._handleLogInClick}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    session: state.session.toJS()
  }
}
const mapDispatchToProps = (dispatch) => ({
  login: (user, password) => dispatch(loginRequestedAction(user, password)),
  dismissErrorDialog: () => dispatch(dismissLoginErrorDialog())
})
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
