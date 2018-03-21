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
import SplashPage from './js/SplashPage';

const store = createStore(app);

const Container = () =>
    <Provider store={store}>
        <View style={{flex: 1}}>
            <SplashPage />
        </View>
    </Provider>;

export default Container;