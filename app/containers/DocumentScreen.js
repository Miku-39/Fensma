import React, { Component } from 'react'
import { View, WebView } from 'react-native'

class DocumentScreen extends Component {
  static navigationOptions = ({title: 'Предпросмотр'})

  render () {
    const { params } = this.props.navigation.state

    return (
      <View style={{flex: 1}}>
        <WebView        
          scalesPageToFit={true}
          startInLoadingState={true}
          automaticallyAdjustContentInsets={true}         
          source={{uri: 'https://media-cdn.tripadvisor.com/media/photo-s/05/9f/bb/4c/lugar-incrivel-minha.jpg'}}
        />
      </View>
    )
  }
}

export default DocumentScreen