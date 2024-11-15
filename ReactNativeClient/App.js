/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import IssueList, { IssueAdd, BlackList } from './IssueList';
// import type {Node} from 'react';

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
                <View style={{flexDirection: 'row'}}>
                  <Button
                    onPress={() => navigation.navigate('AddIssue')}
                    title="Add"
                    color="#fff"
                  />
                  <Button 
                    onPress={() => navigation.navigate('Blacklist')}
                    title="Blacklist"
                    color="#fff"
                  />
                </View>
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

