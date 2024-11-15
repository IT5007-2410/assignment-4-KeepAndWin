/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import IssueList from './IssueList';
import IssueAdd from './IssueAdd';
import BlackList from './BlackList';
// import type {Node} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';


const Stack = createStackNavigator();

export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Issues"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#2196F3',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}>
          <Stack.Screen 
            name="Issues" 
            component={IssueList}
            options={({ navigation }) => ({
              title: 'Issue Tracker',
              headerRight: () => (
                <Button
                  onPress={() => navigation.navigate('AddIssue')}
                  title="+"
                  color="#fff"
                />
              ),
            })}
          />
          <Stack.Screen name="AddIssue" component={IssueAdd} />
          <Stack.Screen name="Blacklist" component={BlackList} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  headerButton: {
    marginRight: 15,
    color: 'white',
    fontSize: 24,
  }
});

