import React from 'react';
import {
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

function App() {
  return (
    <SafeAreaView>
        <View>
          <Text>Hello world</Text>
          <Text style={{fontFamily: "Inter-ExtraBold"}}>Hello world</Text>
          <Icon name="rocket" size={30} color="#900" />
        </View>
    </SafeAreaView>
  );
}

export default App;
