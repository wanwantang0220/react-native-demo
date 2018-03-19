/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import {View} from 'react-native';
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import app from './js/reducer/Reducers'
import MainPage from './js/components/MainPage';

const store = createStore(app);

const Container = () =>
    <Provider store={store}>
        <View style={{flex: 1}}>
            <MainPage/>
        </View>
    </Provider>;

export default Container;