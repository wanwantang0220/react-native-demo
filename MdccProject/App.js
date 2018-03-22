/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StatusBar, BackAndroid, View, Navigator,AsyncStorage} from 'react-native'
import reducers from './js/reducer/Reducer';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {persistStore, autoRehydrate} from 'redux-persist';
import {createStore, applyMiddleware} from 'redux';
import codePush from 'react-native-code-push';
import apiRequest from './js/helper/ApiRequestMiddleware'
import SplashPage from "./js/SplashPage";


const createStoreWithMiddleware = applyMiddleware(thunk, apiRequest)(createStore)

const store = autoRehydrate()(createStoreWithMiddleware)(reducers)
persistStore(store, {storage: AsyncStorage})


export const STATUS_BAR_HEIGHT = (Platform.OS === 'ios' ? 20 : 25)
export const NAV_BAR_HEIGHT = (Platform.OS === 'ios' ? 44 : 56)
export const ABOVE_LOLIPOP = Platform.Version && Platform.Version > 19


export default class App extends Component {

    componentDidMount() {
        BackAndroid.addEventListener('hardwareBackPress', this.handleBack)
    }

    componentWillMount() {
        BackAndroid.removeEventListener('hardwareBackPress', this.handleBack)
    }

    render() {
        return (
            <Provider store={store}>
                <View style={{flex: 1}}>
                    <StatusBar
                        barStyle='light-content'
                        style={{height: STATUS_BAR_HEIGHT}}
                    />
                    <SplashPage />
                </View>
            </Provider>
        );
    }

    handleBack = () => {
        const navigator = this.refs.navigator
        if (navigator && navigator.getCurrentRoutes().length > 1) {
            navigator.pop()
            return true
        }
        return false
    };

    configureScene (route) {
        return route.scene || Navigator.SceneConfigs.FloatFromBottom
    }
}

