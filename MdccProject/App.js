/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StatusBar, BackAndroid,BackHandler , View, Navigator,AsyncStorage} from 'react-native'
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
        BackHandler.addEventListener('hardwareBackPress', this.handleBackAndroid)
    }

    componentWillMount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackAndroid)
    }

    render() {
        return (
            <Provider store={store}>
                <View style={{flex: 1}}>
                    <StatusBar
                        barStyle='light-content'
                        backgroundColor='transparent'
                        style={{height: STATUS_BAR_HEIGHT}}
                        translucent={ABOVE_LOLIPOP}
                    />
                    <SplashPage />
                </View>
            </Provider>
        );
    }

    handleBackAndroid = () => {
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

